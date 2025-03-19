const upvote = require("./upvotemodel");

const add = async (req, res) => {
  let validation = "";
  if (!req.body.issueId) {
    validation += "IssueId is required";
  }
  if (!req.body.customerId) {
    validation += "CustomerId is required";
  }
  if (!!validation) {
    res.send({
      success: false,
      status: 500,
      message: validation,
    });
  } else {
    upvote
      .findOne({ issueId: req.body.issueId, customerId: req.body.customerId })
      .exec()
      .then(async (result) => {
        if (!result) {
          let total = await upvote.countDocuments();
          let newUpvote = new upvote();
          newUpvote.issueId = req.body.issueId;
          newUpvote.customerId = req.body.customerId;
          newUpvote
            .save()
            .then((data) => {
              res.send({
                success: true,
                status: 200,
                message: "Upvoted",
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
        } else {
          res.send({
            success: false,
            status: 500,
            message: "Already Upvoted",
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

const length = async (req, res) => {
  let validation = "";
  if (!req.body.issueId) {
    validation = "issueID is required";
  }
  if (!!validation) {
    return res.send({
      success: false,
      status: 400,
      message: "validation error :" + validation,
    });
  } else {
    let Upvote = await upvote.find({ issueId: req.body.issueId });
    res.send({
      success: true,
      status: 200,
      message: "Upvotes",
      totalUpvotes: Upvote.length,
    });
  }
};

const single = (req, res) => {
  
  let validation = "";
  if (!req.body.customerId) {
    validation = "customerId is required";
  }

  if (!!validation) {
    res.send({
      success: false,
      status: 500,
      message: validation,
    });
  } else {
    upvote
      .findOne({ issueId: req.body.issueId , customerId:req.body.customerId})
      .populate("customerId")
      .exec()
      .then((result) => {
       
        if (result == null) {
          res.status(404).send({
            success: false,
            message: "upvote Not Found",
           
          });
        } else {
          res.send({
            success: true,
            status: 200,
            message: "view upvote",
            data: result,
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
module.exports = {
  add,
  length,
  single,
};
