import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const CounselorProfilePage = () => {
  const { fetchProfileData, putUpdateProfileData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState([])
  console.log(profileData,"this is counselor profile")
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const [file, setFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    const getTheProfileData = async ()=>{
      const data = await fetchProfileData() // Fetch profile data on mount
      setProfileData(data || [])
    }
    getTheProfileData()
  },[isEditing]);
  useEffect(() => {
    if (profileData) {
      // Set initial form data
      setFormData({
        name: profileData.personalInfo?.name || "",
        degree: profileData.counselor?.education.degree || "",
        institution:profileData.counselor?.education?.institution || "",
        experience: profileData.counselor?.education?.experience || "",
        description: profileData.counselor?.education?.description || "",
        accountNumber: profileData.counselor?.payment?.accountNumber || "",
        bankName: profileData.counselor?.payment?.bankName || "",
        branchCode: profileData.counselor?.payment?.branchCode || "",
        
      });
      setFile(profileData.counselor?.file)
      setPreviewImage(profileData?.profile); // Set initial profile image preview
    }
  }, [profileData,previewImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleProfileImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfileImage(selectedFile);
    
    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    
    // Add files and profile image to FormData
    if (profileImage) {
      formDataToSubmit.append("profileImage", profileImage);
    }
    if (file) {
      formDataToSubmit.append("file", file);
    } 

    // Append other form fields
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    // Call API to update profile data
    await putUpdateProfileData(formDataToSubmit);
    setIsEditing(false); // Disable editing mode after submission
  };

  if (!profileData) { 
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <div className="text-center">
        <div className="flex justify-center">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={`http://localhost:3000/images/${previewImage}`}
            alt="Profile"
          />
        </div>

        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="mt-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{formData.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Degree</label>
            {isEditing ? (
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{formData.degree}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Institution</label>
            {isEditing ? (
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{formData.institution}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Experience</label>
            {isEditing ? (
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{formData.experience}</p>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-gray-700 font-semibold">Description</label>
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{formData.description}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Account Number</label>
            {isEditing ? (
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{formData.accountNumber}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Bank Name</label>
            {isEditing ? (
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{formData.bankName}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Branch Code</label>
            {isEditing ? (
              <input
                type="text"
                name="branchCode"
                value={formData.branchCode}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{formData.branchCode}</p>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-gray-700 font-semibold">Upload File</label>
            {isEditing && (
              <input
                type="file"
                name="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            )}
            {!isEditing && file && (
              <a
                href={`http://localhost:3000/files/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View File
              </a>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="py-2 px-4 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white rounded-md"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="py-2 px-4 bg-blue-600 text-white rounded-md"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
