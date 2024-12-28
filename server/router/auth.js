const express = require("express");
const authController = require("../controller/auth");
const authentication = require("../middleware/authentication").authentication;
const zodUser = require("../zod-validation/zodUser");
const zodCounselorProfile = require("../zod-validation/zodCounselorProfile");
const zodValidator = require("../middleware/zodValidation").zodRegistrationValidation;
const uploadProfileAndFiles = require("../utils/multer").uploadProfileAndFiles;
const router = express.Router();

router.post("/login", authController.postLogin);
router.get("/register/verify/:token", authController.getVerify);
router.post(
  "/register",
  uploadProfileAndFiles,
  zodValidator(zodUser, zodCounselorProfile),
  authController.postRegister
);
router.get("/user", authentication, authController.getUser); 
router.post("/email-reset", authController.postEmailResetPassword)
router.post("/password-reset", authController.postResetPassword)

module.exports = router;
