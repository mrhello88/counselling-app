const UserSchema = require("../model/User");

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
