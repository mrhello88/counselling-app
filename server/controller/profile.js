const CounselorProfile = require("../model/CounselorProfile");
const User = require("../model/User");
const deleteFile = require("../utils/fileRemover");
const client = require(".././utils/redisDatabase"); // Assuming you have a Redis client setup

exports.getProfile = async (req, res) => {
  try {
    const { role, personalInfo } = req.user;

    // If the user is a student, return their basic profile data
    if (role === "student") {
      return res.status(200).json({
        data: req.user,
        success: true,
        message: "This is student profile",
      });
    }

    // If the user is an admin, return their basic profile data
    if (role === "admin") {
      return res.status(200).json({
        data: req.user,
        success: true,
        message: "This is admin profile",
      });
    }

    // If the user is a counselor, populate the counselorId for additional details
    const counselorData = await User.findOne({
      "personalInfo.email": personalInfo.email, // Using email to find the counselor
    }).populate("counselor"); // Populate the counselor-specific details

    // If counselor data is not found
    if (!counselorData) {
      return res
        .status(404)
        .json({ message: "Counselor not found", success: false });
    }
    // Return the counselor data with populated counselor
    return res.status(200).json({
      data: counselorData,
      success: true,
      message: "Counselor data with populated counselor",
    });
  } catch (error) {
    // Log and return error response
    return res
      .status(500)
      .json({ message: "Failed to fetch user profile", success: false });
  }
};

exports.postUpdateCounselorProfile = async (req, res) => {
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
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Construct the updated profile object based on the existing data
    let updatedUserProfile = {};
    let updatedProfile = {};

    // Update only the fields provided, while retaining the existing ones
    if (name) updatedUserProfile.personalInfo = { ...user.personalInfo, name }; // Keep email and password, just update name

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
      updatedUserProfile.profile = profileImagePath;
    } else {
      deleteFile(user.profile);
      updatedUserProfile.profile = profileImagePath;
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
      { $set: updatedUserProfile },
      { new: true, useFindAndModify: false }
    );

    const editCounselorProfile = await CounselorProfile.findByIdAndUpdate(
      req.user.counselor,
      { $set: updatedProfile },
      { new: true, useFindAndModify: false }
    );

    // If the user is not found
    if (!editUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (!editCounselorProfile) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Save session in the database
    const userSession = await client.set(
      req.token, // Key (token)
      JSON.stringify({ userId, userData: editUser, token: req.token }), // Value (session data)
      "EX", // Option for expiry time
      259200 // Expiry time in seconds (3 days)
    );

    // Check Redis response. For some Redis clients, 'OK' may not be returned.
    if (userSession !== "OK") {
      return res.status(500).json({
        message: "Failed to create user session in Redis",
        success: false,
      });
    }
    // Success response
    return res.status(200).json({
      message: "Profile updated successfully!",
      data: editUser,
      success: true,
    });
  } catch (error) {
    // Error handling
    return res
      .status(500)
      .json({ message: "Error updating profile", success: false });
  }
};

exports.postUpdateProfile = async (req, res, next) => {
  const { name } = req.body;
  // Access uploaded file paths if they exist
  const profileImagePath = req.files?.profileImage?.[0]?.filename;
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    // If the user is not found
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
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
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Save session in the database
    const userSession = await client.set(
      req.token, // Key (token)
      JSON.stringify({ userId, userData: editUser, token: req.token }), // Value (session data)
      "EX", // Option for expiry time
      259200 // Expiry time in seconds (3 days)
    );

    // Check Redis response. For some Redis clients, 'OK' may not be returned.
    if (userSession !== "OK") {
      return res.status(500).json({
        message: "Failed to create user session in Redis",
        success: false,
      });
    }

    // Success response
    return res.status(200).json({
      message: "Profile updated successfully!",
      data: editUser,
      success: true,
    });
  } catch (error) {
    // Error handling
    return res
      .status(500)
      .json({ message: "Error updating profile", success: false });
  }
};
