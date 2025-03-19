const router = require("express").Router()
const issuecontroller =require("../apis/IssueReporting/issuecontroller")
const customercontroller = require("../apis/Customer/customercontroller")

// router.use(require("../middleware/token"))

router.post("/customer/all",customercontroller.all)
router.post("/customer/single",customercontroller.single)

router.post("/issue/all",issuecontroller.all)
router.post("/issue/single", issuecontroller.single)
router.post("/issue/delete", issuecontroller.del)
router.post("/issue/updateStatus", issuecontroller.updateStatus)

router.all("*", (req, res) => {
  res.send({
    success: false,
    status: 404,
    message: "Invalid address",
  });
});
module.exports = router;  