const customer = require("./customermodel");
const user = require("../user/usermodel");
const bcrypt = require("bcrypt");
const registration = async (req, res) => {
  let validation = "";
  if (!req.body.name) {
    validation += "Name is required ,";
  }
  if (!req.body.email) {
    validation += "Email is required ,";
  }
  if (!req.body.password) {
    validation += "password is required ";
  }
  if (!!validation) {
    res.send({
      success: false,
      status: 500,
      message: "validation error:-" + validation,
    });
  } else {
    let prevcustomer = await customer.findOne({ email: req.body.email }).exec();
    if (prevcustomer == null) {
      let totalUser =await user.countDocuments();
      let newUser = new user();
      newUser.autoId = totalUser + 1;
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = bcrypt.hashSync(req.body.password, 10);

      newUser
        .save()
        .then(async (savedUser) => {
          let totalCustomer = await customer.countDocuments();
          let Customer = new customer();
          Customer.autoId = totalCustomer + 1;
          Customer.name = req.body.name;
          Customer.email = req.body.email;
          Customer.userId = savedUser._id;

          Customer.save()
            .then((savedCustomer) => {
              res.send({
                success: true,
                status: 200,
                message: "New Account created",
              });
            })
            .catch((err) => {
              res.send({
                success: false,
                status: 500,
                message: "Error:-" + err.message,
              });
            });
        })
        .catch((err) => {
          res.send({
            success: false,
            status: 500,
            message: "Error:-" + err.message,
          });
        });
    } else {
      res.send({
        success: false,
        status: 200,
        message: "User already exists with same mail",
      });
    }
  }
};

const all = (req, res) => {
  customer
    .find(req.body)
    .sort({ createdAt: 1 })
    .populate('userId')
    .exec()
    .then((data) => {
      res.send({
        success: true,
        status: 200,
        message: "all customer",
        data: data,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        status: 500,
        message: err.message,
      });
    });
};
const single = (req, res) => {
  let validation = "";
  if (!req.body.userId) {
    validation = "userId is required";
  }
  if (!!validation) {
    res.send({
      success: false,
      status: 500,
      message: "validation error:-" + validation,
    });
  } else {
    customer
      .findOne({ userId: req.body.userId })
      .populate("userId")
      .exec()
      .then((data) => {
        if (data == null) {
          res.send({
            success: false,
            status: 404,
            message: "Customer not found",
          });
        } else {
          res.send({
            success: true,
            status: 200,
            message: "View customer",
            data: data,
          });
        }
      })
      .catch((err) => {
        res.send({
          success: false,  
          status: 500,
          message: err.message,
        });
      });
  }
};
 module.exports={registration, all,single}