const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const authentication = require("../middleware/authentication").authentication;
const addBook = require("../utils/multer").AddBook;

router.get(
  "/toggleStatus/:Id",
  authentication,
  adminController.getToggleStatus
);
router.post("/add-book", authentication, addBook, adminController.postAddBook);
router.get('/get-books', authentication, adminController.getAllBooks)
module.exports = router;
