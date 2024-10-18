const express = require("express");
const counselingSessionController = require("../controller/counselingSession");
const authentication = require("../middleware/authentication").authentication;
const router = express.Router();

router.get(
  "/counselorProfile/:userId",
  counselingSessionController.getCounselorProfile
);

router.post(
  "/counseling-schedule",
  authentication,
  counselingSessionController.postscheduleCounseling
);

router.get(
  "/counseling-schedule/:counselorId",
  authentication,
  counselingSessionController.getscheduleCounseling
);
module.exports = router;
