const express = require("express");
const authController = require("../controller/auth");
const authentication = require("../middleware/authentication").authentication;
const zodUser = require("../zod-validation/zodUser");
const zodCounselorProfile = require("../zod-validation/zodCounselorProfile");
const zodValidator = require("../middleware/zodValidation").zodRegistrationValidation;
const uploadProfileAndFiles = require("../utils/multer").uploadProfileAndFiles;
const router = express.Router();

router.post("/login", authController.postLogin);
router.post(
  "/register",
  uploadProfileAndFiles,
  zodValidator(zodUser, zodCounselorProfile),
  authController.postRegister
);
router.get("/user", authentication, authController.getUser);
router.get("/register/verify/:token", authController.getVerify);
module.exports = router;
