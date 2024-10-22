const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.authentication = async (req, res, next) => {
  try {
    // Check if Authorization header is provided
    const token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          message: "Unauthorized: Token not provided or malformed",
          success: false,
        });
    }

    // Extract JWT token by removing "Bearer " prefix
    const jwtToken = token.replace("Bearer ", "").trim();

    // Verify the token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // Fetch user data using the ID in the token
    const userData = await User.findOne({ _id: isVerified.userId });

    if (!userData) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not found", success: false });
    }

    // Attach user data and token to the request object
    req.user = userData;
    req.token = jwtToken;
    req.userId = userData._id;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Authentication Error: ", error.message);
    return res
      .status(401)
      .json({
        message: "Unauthorized: Invalid token or session expired",
        success: false,
      });
  }
};
