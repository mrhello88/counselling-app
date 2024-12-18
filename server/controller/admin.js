const UserSchema = require("../model/User");
const AdminBook = require("../model/AdminBook");
const deleteFile = require("../utils/fileRemover");
exports.getToggleStatus = async (req, res, next) => {
  try {
    const { Id: studentId } = req.params;

    // Find the user by ID
    const user = await UserSchema.findById(studentId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Toggle the status between 'active' and 'disabled'
    const newStatus = user.status === "active" ? "disabled" : "active";

    // Update the user's status
    const updatedUser = await UserSchema.findByIdAndUpdate(
      studentId,
      { status: newStatus }, // Update status to the new status
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: `User status successfully updated to ${newStatus}`,
      success: true,
      user: updatedUser, // Optionally return the updated user data
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.postAddBook = async (req, res, next) => {
  try {
    const { bookTitle, bookDescription } = req.body;

    // Safely check for uploaded files
    const bookPdf = req.files?.["bookPdf"]?.[0]?.filename;
    const bookImage = req.files?.["bookImage"]?.[0]?.filename;

    // Validate all required fields
    if (!bookTitle || !bookDescription || !bookPdf || !bookImage) {
      deleteFile(bookPdf); // Await the deletion if the file exists
      deleteFile(bookImage); // Await the deletion if the file exists
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Save book to the database
    const bookAdded = await AdminBook.create({
      title: bookTitle,
      description: bookDescription, // Removed duplicate property
      pdfPath: bookPdf,
      imagePath: bookImage,
    });

    if (!bookAdded) {
      deleteFile(bookPdf); // Await the deletion if the file exists
      deleteFile(bookImage); // Await the deletion if the file exists
      return res.status(500).json({
        message: "Failed to add the book. Please try again.",
        success: false,
      });
    }

    // Respond with success
    res.status(200).json({
      message: "Book uploaded successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An internal error occurred.",
      success: false,
      error,
    });
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    // Fetch all books from the database
    const books = await AdminBook.find();

    if (!books || books.length === 0) {
      return res.status(404).json({
        message: "No books found.",
        success: false,
      });
    }

    res.status(200).json({
      message: "Books fetched successfully!",
      success: true,
      data:books,
    });
  } catch (error) {
    res.status(500).json({
      message: "An internal error occurred.",
      success: false,
      error,
    });
  }
};
