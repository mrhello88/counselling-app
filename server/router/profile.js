const express = require("express");
const profileController = require("../controller/profile");
const authentication = require("../middleware/authentication").authentication;
const uploadMulter = require("../utils/multer").uploadImage
const router = express.Router();

router.get("/profile",authentication, profileController.getProfile);
router.post("/update-profile",authentication, profileController.putUpdateProfile);
module.exports = router;
