const express = require("express");
const counselorController = require("../controller/counselor")
const router = express.Router();

router.get("/counselors", counselorController.getCounselor);
router.post("/buy-advice",counselorController.postCAdvice)
router.get("/user/:userId/friends",counselorController.getUCounselors)
module.exports = router