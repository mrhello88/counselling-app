const multer = require("multer");
const path = require("path");

// Define storage for files (images and PDFs)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Separate directories for images and PDFs
    if (file.mimetype === "application/pdf") {
      cb(null, "public/files"); // Directory for PDF files
    } else if (file.mimetype.startsWith("image")) {
      cb(null, "public/images"); // Directory for images
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Image filter to allow only JPEG, JPG, PNG
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, and PNG formats are allowed!'), false);
  }
};

// File filter to allow only PDFs
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only PDF files are allowed!"), false); // Reject the file
  }
};

// Define upload middleware to handle both image and file (PDF)
const uploadProfileAndFiles = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15, // 15MB limit
  },
  fileFilter: (req, file, cb) => {
    // Determine the filter based on file type
    if (file.mimetype.startsWith("image")) {
      imageFilter(req, file, cb); // Use image filter for images
    } else if (file.mimetype === "application/pdf") {
      pdfFilter(req, file, cb); // Use PDF filter for PDFs
    } else {
      cb(new Error("Unsupported file format!"), false);
    }
  },
}).fields([
  { name: "profileImage", maxCount: 1 }, // Single profile image upload
  { name: "file", maxCount: 1 }, // Single PDF upload
]);

module.exports = {
  uploadProfileAndFiles,
};
