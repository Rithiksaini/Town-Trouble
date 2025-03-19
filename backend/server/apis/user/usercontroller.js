const User = require("./usermodel");
const secretKey = "ny5g84ygiweo8yritucyq357tuy2587rgisjb5o87iurgf";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  let validation = "";

  if (!req.body.email) {
    validation += "email is required ";
  }
  if (!req.body.password) {
    validation += "password is required ";
  }

  if (!!validation)
    res.send({
      success: false,
      status: 500,
      message: validation,
    });
  else {
    let userData = await User.findOne({ email: req.body.email });

    if (userData == null) {
      res.send({
        success: false,
        status: 500,
        message: "User does not exist",
      });
    } else {
      if (bcrypt.compareSync(req.body.password, userData.password)) {
        if (userData.status == true) {
          let payload = {
            _id: userData._id,
            email: userData.email,
          };

          let token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
          res.send({
            success: true,
            status: 200,
            message: "Login Successfull",
            data: userData,
            token: token,
          });
        } else
          res.send({
            success: false,
            status: 500,
            message: "Account Inactive",
          });
      } else
        res.send({
          success: false,
          status: 500,
          message: "Invalid Credentials",
        });
    }
  }
};

const update = async (req, res) => {
  let validation = "";
  if (!req.body._id) {
    validation += "_id is required";
  }
  if (!!validation) {
    res.send({
      success: false,
      status: 500,
      message: "validation error" + validation,
    });
  } else {
    User.findOne({ _id: req.body._id })
      .exec()
      .then((result) => {
        if (result == null) {
          res.send({
            success: false,
            status: 500,
            message: "Account does not exist",
          });
        } else if (result.status == true) {
          result.status == false,
            result
              .save()
              .then((updatedData) => {
                res.send({
                  success: true,
                  status: 200,
                  message: "User inactive",
                });
              })
              .catch((err) => {
                res.send({
                  success: false,
                  status: 500,
                  message: err.message,
                });
              });
        } else {
          result.status == true;
          result
            .save()
            .then((updatedData) => {
              res.send({
                success: true,
                status: 200,
                message: "User activated",
              });
            })
            .catch((err) => {
              res.send({
                success: false,
                status: 500,
                message: err.message,
              });
            });
        }
      })
      .catch((err) => {
        res.send({
          success: false,
          status: 500,
          message: err.message,
        })
      })
  }
}

module.exports={login,update}