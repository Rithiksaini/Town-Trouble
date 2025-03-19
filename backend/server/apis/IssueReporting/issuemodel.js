const mongoose = require("mongoose")
const issueSchema = mongoose.Schema({
  autoId: { type: Number, default: 0 },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  category: { type: String, default: "" },
  location:{type:String , default:""},
  attachment: { type: String, default: "Issues/noImage.jpg" },
  userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "user" },   
  createdAt:{type:Date, default:Date.now},
  status:{type:Boolean,default:true},
  action:{type:String, default:"pending"}
});
module.exports = mongoose.model("issue", issueSchema);  