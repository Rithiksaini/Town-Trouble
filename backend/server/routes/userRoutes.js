const router = require("express").Router();
const usercontroller = require("../apis/user/usercontroller");
router.post("/login", usercontroller.login);


router.all("*",(req,res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid address"
    })
})
module.exports =router;