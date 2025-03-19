const mongoose =require("mongoose")
const upvoteSchema = mongoose.Schema({
  issueId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "issue" },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "user",
  },
  createdAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: true},
});
module.exports= mongoose.model("upvote",upvoteSchema)