const express = require("express");
const profileController = require("../controller/profile");
const authentication = require("../middleware/authentication").authentication;
const uploadProfileAndFiles = require("../utils/multer").uploadProfileAndFiles;

const router = express.Router();

router.get("/profile", authentication, profileController.getProfile);
router.post(
  "/update-profile",
  authentication,
  uploadProfileAndFiles,
  profileController.putUpdateProfile
);

router.post(
  "/update-student-profile",
  authentication,
  uploadProfileAndFiles,
  profileController.postUpdateStudentProfile
);
module.exports = router;
