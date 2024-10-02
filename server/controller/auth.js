const jwt = require("jsonwebtoken");
const UserSchema = require("../model/User");

exports.postLogin = async (req, res) => {
  const { email } = req.body; // Destructure the email from req.body
  try {
    // Find the user by email
    const user = await UserSchema.findOne({ email });

    // If the user does not exist, return an error response
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const { name, role } = user;

    // Create JWT token
    const token = jwt.sign(
      { name, email, userId: user._id, role, isLoggedIn: true },
      process.env.JWT_SECRET_KEY, // Replace with your secret key
      {
        expiresIn: 259200, // Token expiry time in seconds (3 days)
      }
    );

    // Save session in the database
    // Set the token in the response cookie

    // Return success response to React
    return res.status(200).json({
      message: "Session added successfully",
      token, // Send the token back to React (optional)
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.log("error from user route", error);
  }
};
