const path = require("path");
const fs = require("fs");

function deleteFile(fileName) {
  // Determine if the file is a PDF or an image based on the extension
  const fileExtension = path.extname(fileName).toLowerCase(); // Get the file extension
  // Set the directory based on the file type
  const folder = fileExtension === ".pdf" ? "files" : "images"; // Use "files" for PDFs, "images" for others

  // Construct the full file path
  const filePath = path.join("public", folder, fileName);
  try {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error while deleting the file:", err);
        return;
      }
      console.log("File successfully deleted!");
    });
  } catch (err) {
    console.error("Error while deleting the file:", err);
  }
}

module.exports = deleteFile;
