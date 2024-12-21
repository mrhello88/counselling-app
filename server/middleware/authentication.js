const jwt = require("jsonwebtoken");
const client = require("../utils/redisDatabase");

exports.authentication = async (req, res, next) => {
  try {
    // Check if Authorization header is provided
    const token = req.header("Authorization");
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: Token not provided or malformed",
        success: false,
      });
    }

    // Extract JWT token by removing "Bearer " prefix
    const jwtToken = token.replace("Bearer ", "").trim();
    // Fetch user session from Redis
    const userSession = await client.get(jwtToken); 
    if (!userSession) {
      return res.status(401).json({
        message: "Unauthorized: Session expired or invalid",
        success: false,
      });
    }

    // Parse session data
    const sessionData = JSON.parse(userSession);

    if (!sessionData.token || !sessionData.userData) {
      return res.status(401).json({
        message: "Unauthorized: Invalid session data",
        success: false,
      });
    }

    // Verify the token
    const decodedToken = jwt.verify(
      sessionData.token,
      process.env.JWT_SECRET_KEY
    );

    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({
        message: "Unauthorized: Missing user information in token",
        success: false,
      });
    }

    // Attach user data and session info to the request object
    req.user = sessionData.userData;
    req.isLoggedIn = decodedToken.isLoggedIn;
    req.userId = sessionData.userData._id;

    // Proceed to the next middleware
    next(); 
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token or session expired",
      success: false,
    });
  }
};
