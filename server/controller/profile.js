const User = require("../model/User");
const deleteFile = require("../utils/fileRemover");
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Adjust based on how you authenticate
    console.log(user, "profile image");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

exports.postUpdateStudentProfile = async (req, res, next) => {
  const { name } = req.body;
  // Access uploaded file paths if they exist
  const profileImagePath = req.files?.profileImage?.[0]?.filename;
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Construct the updated profile object based on the existing data
    let updatedProfile = {};

    // Update only the fields provided, while retaining the existing ones
    if (name) updatedProfile.personalInfo = { ...user.personalInfo, name }; // Keep email and password, just update name

    if (user.profile === "dummyImage.png" || profileImagePath === undefined) {
      updatedProfile.profile = profileImagePath;
    } else {
      deleteFile(user.profile);
      updatedProfile.profile = profileImagePath;
    }

    const editUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedProfile },
      { new: true, useFindAndModify: false }
    );

    // If the user is not found
    if (!editUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Success response
    return res
      .status(200)
      .json({ message: "Profile updated successfully!", editUser });
  } catch (error) {
    // Error handling
    return res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

exports.putUpdateProfile = async (req, res) => {
  const {
    name,
    degree,
    institution,
    experience,
    description,
    accountNumber,
    bankName,
    branchCode,
  } = req.body;

  // Access uploaded file paths if they exist
  const profileImagePath = req.files?.profileImage?.[0]?.filename;
  const filePath = req.files?.file?.[0]?.filename;
  try {
    // Find the user by ID and update their profile
    const userId = req.user._id; // Assuming `req.user._id` contains the authenticated user's ID
    const user = await User.findById(userId);

    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Construct the updated profile object based on the existing data
    let updatedProfile = {};

    // Update only the fields provided, while retaining the existing ones
    if (name) updatedProfile.personalInfo = { ...user.personalInfo, name }; // Keep email and password, just update name

    // Conditionally update education fields
    if (degree || institution || experience || description) {
      updatedProfile.education = {
        degree: degree || user.education.degree,
        institution: institution || user.education.institution,
        experience: experience || user.education.experience,
        description: description || user.education.description,
      };
    }

    // Conditionally update payment fields
    if (accountNumber || bankName || branchCode) {
      updatedProfile.payment = {
        accountNumber: accountNumber || user.payment.accountNumber,
        bankName: bankName || user.payment.bankName,
        branchCode: branchCode || user.payment.branchCode,
      };
    }

    if (user.profile === "dummyImage.png") {
      updatedProfile.profile = profileImagePath;
    } else {
      deleteFile(user.profile);
      updatedProfile.profile = profileImagePath;
    }

    if (filePath) {
      deleteFile(user.file);
      updatedProfile.file = filePath;
    } else {
      updatedProfile.file = filePath;
    }
    // Conditionally update profile image and file

    const editUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedProfile },
      { new: true, useFindAndModify: false }
    );

    // If the user is not found
    if (!editUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Success response
    return res
      .status(200)
      .json({ message: "Profile updated successfully!", editUser });
  } catch (error) {
    // Error handling
    return res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
