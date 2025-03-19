const secretKey = "ny5g84ygiweo8yritucyq357tuy2587rgisjb5o87iurgf";
const jwt = require("jsonwebtoken");


const check = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!!token) {
    jwt.verify(token, secretKey, (err,data) => {
      if (err) {

        res.send({
          success: false,
          status: 401,
          message: "Unauthorized access",
          token,
        });
      } else {
         req.body.userId=data._id
         req.body.customerId=data._id
        next();
      }
    });
  } else {
    res.send({
      success: false,
      status: 404,
      message: "No Token Found",
    });
  }

};

module.exports = check;
