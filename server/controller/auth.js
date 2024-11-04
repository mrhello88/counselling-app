const jwt = require("jsonwebtoken");
const UserSchema = require("../model/User");
const CounselorProfileSchema = require("../model/CounselorProfile");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const cryptoSchema = require("../model/CryptoToken");
const sendMail = require("../utils/nodeMailer");
exports.postLogin = async (req, res) => {
  try {
    const { email, role, password } = req.body; // Destructure the email from req.body
    // Find the user by email
    const user = await UserSchema.findOne({
      "personalInfo.email": email,
      role,
    });

    // If the user does not exist, return an error response
    if (!user) {
      return res
        .status(401)
        .json({ message: `${role} does not exist`, success: false });
    }
    // Compare the provided password with the stored password hash
    const isMatch = await bcryptjs.compare(
      password,
      user.personalInfo.password
    );

    // If the password does not match, return an error response
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    const { personalInfo } = user;

    // Create JWT token
    const token = jwt.sign(
      {
        name: personalInfo.name,
        email: personalInfo.email,
        userId: user._id,
        role,
        isLoggedIn: true,
      },
      process.env.JWT_SECRET_KEY, // Replace with your secret key
      {
        expiresIn: 259200, // Token expiry time in seconds (3 days)
      }
    );

    // Save session in the database
    // Set the token in the response cookie

    // Return success response to React
    return res.status(200).json({
      message: "Login successfully",
      token, // Send the token back to React (optional)
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.postRegister = async (req, res, next) => {
  try {
    const { role, personalInfo } = req.body.registerUser;
    if (role === "counselor") {
      const { education, payment } = req.body.registerUser;
      const filePath = req.files?.file?.[0]?.filename;

      // Check if the user already exists
      const user = await UserSchema.findOne({
        "personalInfo.email": personalInfo.email,
      });

      if (user) {
        return res
          .status(409)
          .json({ message: "User already exist", success: false });
      }

      // Generate token and hash password
      const token = crypto.randomBytes(32).toString("hex");
      const bcryptPassword = await bcryptjs.hash(personalInfo.password, 12);
      personalInfo.password = bcryptPassword;
      //removing 'confirmPassword' from personalInfo
      delete personalInfo.confirmPassword;
      // Save token and user data in the cryptoSchema
      const saveCryptotoken = new cryptoSchema({
        token,
        personalInfo,
        education,
        payment,
        file: filePath,
        role,
      });
      await saveCryptotoken.save();
      if (saveCryptotoken) {
        // Send email with token
        sendMail(personalInfo.email, token, "verify");
        return res
          .status(200)
          .json({ message: "Check your Email!", success: true });
      }
    } else {
      // Check if the user already exists
      const user = await UserSchema.findOne({
        "personalInfo.email": personalInfo.email,
      });

      if (user) {
        return res
          .status(409)
          .json({ message: "User already exist", success: false });
      }

      // Generate token and hash password
      const token = crypto.randomBytes(32).toString("hex");
      const bcryptPassword = await bcryptjs.hash(personalInfo.password, 12);
      personalInfo.password = bcryptPassword;
      //removing 'confirmPassword' from personalInfo
      delete personalInfo.confirmPassword;
      // Save token and user data in the cryptoSchema
      let saveCryptotoken = new cryptoSchema({
        token,
        personalInfo,
        role,
      });
      await saveCryptotoken.save();
      if (saveCryptotoken) {
        // Send email with token
        sendMail(personalInfo.email, token, "verify");
        return res
          .status(200)
          .json({ message: "Check your Email!", success: true });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { role, personalInfo } = req.user;

    // If the user is a student, simply return the user data
    if (role === "student") {
      return res.status(200).json({
        data: req.user,
        message: "this is student not counselor",
        success: true,
      });
    }

    // If the user is a counselor, fetch their data and populate the counselorId
    const counselorData = await UserSchema.findOne({
      "personalInfo.email": personalInfo.email,
    }).populate("counselor");

    if (!counselorData) {
      return res
        .status(404)
        .json({ message: "Counselor not found", success: false });
    }
    return res
      .status(200)
      .json({ data: counselorData, message: "user LoggedIn", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.getVerify = async (req, res, next) => {
  try {
    const cryptoToken = req.params.token;
    // Find user by token in cryptoSchema
    const cryptoUser = await cryptoSchema.findOne({ token: cryptoToken });
    if (!cryptoUser) {
      return res
        .status(404)
        .json({ message: "Time is out Please Register again", success: false });
    }

    const { role } = cryptoUser;

    if (role === "counselor") {
      const { personalInfo, education, payment, file } = cryptoUser;
      const counselorProfile = new CounselorProfileSchema({
        education,
        payment,
        file,
      });
      const saveUser = new UserSchema({
        personalInfo,
        profile: "dummyImage.png",
        role,
        friends: [],
        counselor: counselorProfile._id,
      });
      // Save the user and counselorProfile to the database
      await counselorProfile.save();
      const user = await saveUser.save();

      // Assign sessions and set a cookie with the token
      const token = jwt.sign(
        {
          name: personalInfo.name,
          email: personalInfo.email,
          userId: user._id,
          role,
          isLoggedIn: true,
        },
        process.env.JWT_SECRET_KEY, // Replace with your secret key
        {
          expiresIn: 259200, // Token expiry time in seconds (3 days)
        }
      );
      // await cryptoUser.deleteOne({ personalInfo: personalInfo.email }); // delete when the user Verify, not wait for 5min
      return res.status(200).json({
        message: "Session added successfully",
        token, // Send the token back to React (optional)
        data: user,
        success: true,
      });
    } else {
      const { personalInfo } = cryptoUser;
      // Create a new user with the info from the token
      const saveUser = new UserSchema({
        personalInfo,
        role,
        friends: [],
        profile: "dummyImage.png",
      });

      // Save the user to the database
      const user = await saveUser.save();

      // Assign sessions and set a cookie with the token
      const token = jwt.sign(
        {
          name: personalInfo.name,
          email: personalInfo.email,
          userId: user._id,
          role,
          isLoggedIn: true,
        },
        process.env.JWT_SECRET_KEY, // Replace with your secret key
        {
          expiresIn: 259200, // Token expiry time in seconds (3 days)
        }
      );
      // await cryptoUser.deleteOne({ personalInfo: personalInfo.email });
      return res.status(200).json({
        message: "Session added successfully",
        token, // Send the token back to React (optional)
        data: user,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.postEmailResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const hash = crypto.randomBytes(32);
    const token = hash.toString("hex");
    const user = await UserSchema.findOne({
      "personalInfo.email": email,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Not Found the User", success: false });
    }

    user.Token = token;
    user.TokenExpires = Date.now() + 60000;
    await user.save();
    sendMail(user.personalInfo.email, token, "reset");
    return res
      .status(200)
      .json({ message: "Check your Email!", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.postResetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const user = await UserSchema.findOne({
      Token: token,
      TokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        message: "Token has expired. Please try again.",
        success: false,
      });
    }
    const bcryptPassword = await bcryptjs.hash(password, 12);
    user.Token = undefined;
    user.TokenExpires = undefined;
    user.personalInfo.password = bcryptPassword;
    await user.save();
    return res
      .status(200)
      .json({ message: "Password Reset Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
