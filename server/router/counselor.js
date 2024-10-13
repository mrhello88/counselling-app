const express = require("express");
const counselorController = require("../controller/counselor")
const authentication = require("../middleware/authentication").authentication
const router = express.Router();

router.get("/counselors", counselorController.getCounselor);
router.post("/buy-advice",authentication,counselorController.postCAdvice)
router.post("/create-counseling",authentication,counselorController.postCreateCounseling)
router.get("/user/friends",authentication,counselorController.getUCounselors)
module.exports = router 