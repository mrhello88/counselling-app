const express = require("express");
const authController = require("../controller/auth");
const authentication = require("../middleware/authentication").authentication;
const uploadProfileAndFiles = require("../utils/multer").uploadProfileAndFiles;
const router = express.Router();

router.post("/login", authController.postLogin);
router.post("/register", uploadProfileAndFiles, authController.postRegister);
router.get("/user", authentication, authController.getUser);
router.get("/register/verify/:token", authController.getVerify);
module.exports = router;
 