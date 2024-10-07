const User = require("../model/User");

exports.getProfile = async (req, res) => {
  try {
    console.log(req.user._id, "userId by getProfile")
    const user = await User.findById(req.user._id); // Adjust based on how you authenticate
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

exports.putUpdateProfile = async (req, res) => {
  try {
    const {
      name,
      degree,
      institution,
      experience,
      description,
      accountNumber,
      bankName,
      branchCode,
      file,
    } = req.body;
    console.log(req.body, "put  update profile")
    // // Find the user by ID and update the profile
    // const updatedUser = await User.findByIdAndUpdate(
    //   req.user._id,
    //   {
    //     $set: {
    //       'personalInfo.name': name,
    //       'education.degree': degree,
    //       'education.institution': institution,
    //       'education.experience': experience,
    //       'education.description': description,
    //       'payment.accountNumber': accountNumber,
    //       'payment.bankName': bankName,
    //       'payment.branchCode': branchCode,
    //       file, // Assuming the file is handled separately
    //     },
    //   },
    //   { new: true } // Return the updated document
    // );

    // if (!updatedUser) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // return res.status(200).json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
