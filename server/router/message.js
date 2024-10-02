const express = require("express");
const messages = require("../controller/message");
const authentication = require("../middleware/authentication").authentication;
const router = express.Router();

router.post("/send/:id", authentication, messages.postMessages);
router.get("/get/:id",authentication, messages.postGetMessages);

module.exports = router;
