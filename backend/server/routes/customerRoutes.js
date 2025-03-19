const router = require("express").Router();
const multer = require("multer");
const upvotecontroller = require("../apis/Upvote/upvotecontroller");
const customercontroller = require("../apis/Customer/customercontroller");
const issuecontroller = require("../apis/IssueReporting/issuecontroller");
router.post("/registration", customercontroller.registration);
router.post("/all", customercontroller.all);

router.post("/length", upvotecontroller.length);
router.post("/issue/all", issuecontroller.all);
router.post("/issue/single", issuecontroller.single);

// router.use(require("../middleware/token"));


const issueStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "server/public/Issues");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+"-"+file.fieldname+"-"+file.originalname);
  },
});
const issueUpload = multer({ storage: issueStorage });
router.post("/issue/add", issueUpload.single("attachment"), issuecontroller.add);
router.post(
  "/issue/update",issueUpload.single("attachment"),issuecontroller.update );
router.post("/issue/delete", issuecontroller.del)
router.post("/upvote/add", upvotecontroller.add);
router.post("/upvote/single", upvotecontroller.single);
router.post("/upvote/length", upvotecontroller.length);
router.all("*", (req, res) => {
  res.send({
    success: false,
    status: 404,
    message: "Invalid address",
  });
});
module.exports = router;
