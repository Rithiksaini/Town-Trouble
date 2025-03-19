const issue = require("./issuemodel");

const add = async (req, res) => {
  let validation = "";
  if (!req.body.title) {
    validation += "Title is required ,";
  }
  if (!req.body.description) {
    validation += "description is required ,";
  }
  if (!req.body.category) {
    validation += "category is required ,";
  }
  if (!req.body.location) {
    validation += "location is required ,";
  }
  if (!req.body.userId) {
    validation += "userId is required";
  }
  if (!!validation) {
    res.send({
      success: false,
      status: 500,
      message: "validation error:- " + validation,
    });
  } else {
    let prevIssue = await issue
      .findOne({ userId: req.body.userId, title: req.body.title })
      .exec();
    if (prevIssue == null) {
      let total = await issue.countDocuments();
      let Issue = new issue();
      Issue.autoId = total + 1;
      (Issue.title = req.body.title),
        (Issue.description = req.body.description),
        (Issue.category = req.body.category);
      Issue.location = req.body.location;
      (Issue.attachment = req.file.filename), (Issue.userId = req.body.userId);
      Issue.save()
        .then((savedIssue) => {
          res.send({
            success: true,
            status: 200,
            message: "Issue Reported",
          });
        })
        .catch((err) => {
          res.send({
            sucess: false,
            status: 500,
            message: err.message,
          });
        });
    } else {
      res.send({
        sucess: false,
        status: 500,
        message: "you are reporting same Issue again, please change your title",
      });
    }
  }
};
const all = (req, res) => {
  issue
    .find(req.body)
    .sort({ createdAt: -1 })
    .populate("userId")
    .exec()
    .then((result) => {
      res.send({
        success: true,
        status: 200,
        message: "all Issues",
        data: result,
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
  if (!req.body._id) {
    validation = "_id is required";
  }

  if (!!validation) {
    res.send({
      success: false,
      status: 500,
      message: validation,
    });
  } else {
    issue
      .findOne({ _id: req.body._id })
      .populate("userId")
      .exec()
      .then((result) => {
        if (result == null) {
          res.send({
            success: false,
            status: 500,
            message: "Issue Not Found",
          });
        } else {
          res.send({
            success: true,
            status: 200,
            message: "view Issue",
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

const update = (req, res) => {
  let validation = "";
  if (!req.body._id) {
    validation = "_id is required";
  }
  if (!!validation) {
    res.send({
      success: false,
      status: 500,
      message: validation,
    });
  } else {
    issue
      .findOne({ _id: req.body._id })
      .exec()
      .then((result) => {
        if (result == null) {
          res.send({
            success: false,
            status: 400,
            message: "Issue not exist",
          });
        } else {
          if (!!req.body.title) result.title = req.body.title;
          if (!!req.body.description) result.description = req.body.description;
          if (!!req.body.location) result.location = req.body.location;
          if (!!req.file) result.attachment =  req.file.filename;

          result
            .save()
            .then((updatedData) => {
              res.send({
                success: true,
                status: 200,
                message: "Issue Updated",
                data: updatedData,
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
        });
      });
  }
};

const del = (req, res) => {
  let validation = "";
  if (!req.body._id) {
    validation += "_id is required";
  }

  if (!!validation) {
    res.send({
      success: false,
      status: 400,
      message: "Validation Error : " + validation,
    });
  } else {
    issue
      .findOne({ _id: req.body._id })
      .exec()
      .then((result) => {
        if (result == null) {
          res.send({
            success: false,
            status: 400,
            message: "Issue does not exist",
          });
        } else if (result.status == true) {
          result.status = false;

          result
            .save()
            .then((updatedData) => {
              res.send({
                success: true,
                status: 200,
                message: "Data Deleted",
                data: updatedData,
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
          result.status = true;
          result
            .save()
            .then((updatedData) => {
              res.send({
                success: true,
                status: 200,
                message: "Status upated",
                data: updatedData,
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
        });
      });
  }
};

const updateStatus = (req, res) => {
  console.log(req.body);
  let validation = "";
  if (!req.body._id) {
    validation = "_id is required";
  }
  if (!req.body.action) {
    validation = "action is required";
  }
  if (!!validation) {
    res.send({
      success: false,
      status: 404,
      message: "validation error :" + validation,
    });
  } else {
    issue
      .findOne({ _id: req.body._id })
      .exec()
      .then((result) => {
        if (result == null) {
          res.send({
            success: false,
            status: 404,
            message: "issue not found",
          });
        } else {
          if (!!req.body.action) result.action = req.body.action;
          result
            .save()
            .then((response) => {
              res.send({
                success: true,
                status: 200,
                message: "Status updated successfully",
                data: response,
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
        });
      });
  }
};
module.exports = { add, all, single, update, del, updateStatus };
