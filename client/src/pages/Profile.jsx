import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const ProfilePage = () => {
  const { user, fetchProfileData, putUpdateProfileData } = useAuth();
  const { profileData } = user || {}; // Ensure user is defined before destructuring
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState("");

  useEffect(() => {
    fetchProfileData(); // Fetch profile data on mount
  }, []);

  useEffect(() => {
    if (profileData) {
      // Set initial form data when profileData is available
      setFormData({
        name: profileData.personalInfo?.name || "",
        degree: profileData.education?.degree || "",
        institution: profileData.education?.institution || "",
        experience: profileData.education?.experience || "",
        description: profileData.education?.description || "",
        accountNumber: profileData.payment?.accountNumber || "",
        bankName: profileData.payment?.bankName || "",
        branchCode: profileData.payment?.branchCode || "",
        file: profileData.file || "",
      });
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Handle file upload if needed
    if (file) {
      const formDataWithFile = new FormData();
      formDataWithFile.append("file", file);
      // Append other form fields to FormData
      for (const key in formData) {
        formDataWithFile.append(key, formData[key]);
      }
      await putUpdateProfileData(formDataWithFile);
    } else {
      await putUpdateProfileData(formData);
    }
    
    setIsEditing(false);
  };

  if (!profileData) {
    return <p>Loading...</p>; // Show loading state if profileData is not available yet
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={profileData.profile || "https://via.placeholder.com/150"} // Use the profile image or placeholder
            alt="Profile"
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Personal Details */}
          <div>
            <div className="flex justify-between">
              <label className="font-semibold">Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border p-1 rounded"
                />
              ) : (
                <span>{formData.name || "N/A"}</span>
              )}
            </div>
            {/* Repeat similar structure for other fields */}
            <div className="flex justify-between">
              <label className="font-semibold">Degree:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="border p-1 rounded"
                />
              ) : (
                <span>{formData.degree || "N/A"}</span>
              )}
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Institution:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="border p-1 rounded"
                />
              ) : (
                <span>{formData.institution || "N/A"}</span>
              )}
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Experience:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="border p-1 rounded"
                />
              ) : (
                <span>{formData.experience || "N/A"}</span>
              )}
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Description:</label>
              {isEditing ? (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border p-1 rounded"
                />
              ) : (
                <span>{formData.description || "N/A"}</span>
              )}
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <div className="flex justify-between">
              <label className="font-semibold">Account Number:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="border p-1 rounded"
                />
              ) : (
                <span>{formData.accountNumber || "N/A"}</span>
              )}
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Bank Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="border p-1 rounded"
                />
              ) : (
                <span>{formData.bankName || "N/A"}</span>
              )}
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Branch Code:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="branchCode"
                  value={formData.branchCode}
                  onChange={handleInputChange}
                  className="border p-1 rounded"
                />
              ) : (
                <span>{formData.branchCode || "N/A"}</span>
              )}
            </div>
            <div className="flex justify-between">
              {isEditing ? (
                <>
                  <label className="font-semibold">Change file:</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    name="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* PDF Preview */}
          <div className="mt-6">
            <label className="font-semibold">Uploaded File:</label>
            {formData.file ? (
              <iframe
                src={
                  "http://localhost:3000/files/1728233814914-FypFinal%20(1).pdf"
                } // Display the file if it exists
                className="w-full h-64 mt-2 border border-gray-300"
                title="PDF Preview"
              ></iframe>
            ) : (
              <p>No file uploaded yet.</p>
            )}
          </div>

          {/* Edit Button */}
          <div className="mt-6 flex justify-between">
            {isEditing ? (
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button" // Make sure this button does not submit the form
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
