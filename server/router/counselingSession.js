const express = require("express");
const counselingSessionController = require("../controller/counselingSession");
const authentication = require("../middleware/authentication").authentication;
const zodValidation = require("../middleware/zodValidation").zodValidation;
const counselingSessionSchemaZod = require("../zod-validation/counselingSessionZod");
const router = express.Router();

router.get(
  "/counselorProfile/:counselorId",
  counselingSessionController.getCounselorProfile
);

router.post(
  "/counseling-schedule",
  authentication,
  zodValidation(counselingSessionSchemaZod),
  counselingSessionController.postscheduleCounseling
);

router.get(
  "/counseling-schedule/:counselorId",
  authentication,
  counselingSessionController.getscheduleCounseling
);
module.exports = router;
