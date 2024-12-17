const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const authentication = require("../middleware/authentication").authentication;

router.get("/toggleStatus/:Id", authentication, adminController.getToggleStatus);


module.exports = router;
