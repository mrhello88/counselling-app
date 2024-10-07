const jwt = require("jsonwebtoken");
const User = require("../model/User");
exports.authentication = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not Provided" });
  }
  const jwtToken = token.replace("Bearer", " ").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ _id: isVerified.userId });
    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    console.log("userId", userData._id);

    next();
  } catch (error) {
    console.log(error.message)
    return res.status(401).json({ message: "Unauthorized, Invalid Token" });
  }
};
