const express = require("express");
const authController = require("../controller/auth");
const authentication = require("../middleware/authentication").authentication;
const router = express.Router();

router.post("/login", authController.postLogin);
router.post("/register", authController.postRegister)
router.get("/user", authentication, authController.getUser);

module.exports = router;
  









 
