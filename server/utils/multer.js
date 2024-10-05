const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//     cb(new Error('The file is not "jpg" or "png" format!'))
//   }
 
// };


// File filter to allow PDFs only
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true); // Accept the file
    } else {
      cb(null, false); // Reject the file
      cb(new Error('Only PDF files are allowed!')); // Error if not PDF
    }
  };

module.exports = {
  storage,
  fileFilter,
};
