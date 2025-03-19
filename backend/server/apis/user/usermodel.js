const mongoose = require('mongoose')
 const userSchema = mongoose.Schema({
   autoId: { type: Number, default: 0 },
   name: { type: String, default: "" },
   email: { type: String, default: "" },
   password: { type: String, default: "" },
   userType: {type:Number, default :2}, //1-Admin 2-User
   createdAt: {type:Date, default:Date.now},
   status: {type:Boolean, default:true},
 });
 module.exports = mongoose.model("user", userSchema);