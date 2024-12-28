import React, { useState } from "react";
import { useAuth } from "../../../../context/Context";
import { toast } from "react-toastify";

export const AdminBookUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pdfFile: null,
    pdfPreview: null,
    imageFile: null,
    imagePreview: null,
  });
  const [error, setError] = useState("");
  const { postData } = useAuth();

  const validateFile = (file, type, maxSize) => {
    const validTypes = {
      pdf: ["application/pdf"],
      image: ["image/jpeg", "image/png"],
    };

    if (!validTypes[type].includes(file.type)) {
      return `Invalid file type. Please upload a ${
        type === "pdf" ? "PDF" : "JPG/PNG"
      } file.`;
    }

    if (file.size > maxSize) {
      return `File size must be less than ${type === "pdf" ? "50MB" : "5MB"}.`;
    }

    return "";
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = type === "pdf" ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    const validationError = validateFile(file, type, maxSize);
    if (validationError) {
      setError(validationError);
      setFormData((prev) => ({
        ...prev,
        [`${type}File`]: null,
        [`${type}Preview`]: null,
      }));
      return;
    }

    setError("");
    setFormData((prev) => ({
      ...prev,
      [`${type}File`]: file,
      [`${type}Preview`]: URL.createObjectURL(file),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, pdfFile, imageFile } = formData;

    if (!pdfFile || !imageFile) {
      setError("Please upload both the PDF and cover image.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("bookTitle", title);
    uploadData.append("bookDescription", description);
    uploadData.append("bookPdf", pdfFile);
    uploadData.append("bookImage", imageFile);

    try {
      const responseData = await postData(
        `${process.env.BACKEND_URL}/api/add-book`,
        uploadData
      );
      if (responseData.success) {
        toast.success(responseData.message || "Book added successfully!");
        setFormData({
          title: "",
          description: "",
          pdfFile: null,
          pdfPreview: null,
          imageFile: null,
          imagePreview: null,
        });
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error during book upload:", error);
      toast.error("Failed to upload book. Please try again.");
    }
  };

  const { title, description, pdfPreview, imagePreview } = formData;

  return (
    <div className="p-4 bg-white rounded-lg w-full h-screen">
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">
          Upload New Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-red-300 h-full flex-col">
          {/* Title */}
          <div>
            <label className="block text-secondary font-semibold mb-2">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-primary focus:outline-none"
              placeholder="Enter book title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-secondary font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-primary focus:outline-none"
              rows="3"
              placeholder="Enter description"
              required
            />
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-secondary font-semibold mb-2">
              Upload PDF (Max 50MB)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, "pdf")}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-secondary font-semibold mb-2">
              Upload Cover Image (JPG/PNG, Max 5MB)
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => handleFileChange(e, "image")}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Previews */}
          {(imagePreview || pdfPreview) && (
            <div className="border rounded-md p-3 bg-gray-50">
              <h3 className="font-semibold text-secondary mb-2">Preview</h3>
              <p>
                <strong>Title:</strong> {title}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Cover Preview"
                  className="w-32 h-32 object-cover rounded-lg mb-2"
                />
              )}
              {pdfPreview && (
                <a
                  href={pdfPreview}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  View PDF
                </a>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-lg hover:bg-primary-dark"
          >
            Submit
          </button>
        </form>
      </div>
  );
};
