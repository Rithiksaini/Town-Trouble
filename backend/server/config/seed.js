const user = require("../apis/user/usermodel");
const bcrypt = require("bcrypt");

user
  .findOne({ email: "admin1@gmail.com" })
  .exec()
  .then((data) => {
    if (data == null) {
      let admin = new user();
      (admin.autoId = 1),
        (admin.name = "Admin"),
        (admin.email = "admin1@gmail.com"),
        (admin.password = bcrypt.hashSync("Admin@123", 10));
      (admin.userType = 1),
        admin
          .save()
          .then((data) => {
            console.log("Admin created");
          })
          .catch((err) => {
            console.log("error in creating admin");
          });
    } else {
      console.log("Admin already created");
    }
  })
  .catch((err) => console.log("Error in finding Admin", err));
