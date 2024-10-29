// const CounselorSchema = require("../model/Counselor");
const CreateCounseling = require("../model/CreateCounseling");
const UserSchema = require("../model/User");
exports.getCounselor = async (req, res) => {
  try {
    // Find the user by ID and populate both the counselor and counseling references
    const counselor = await UserSchema.find({ role: "counselor" })
      .populate("counselor") // Populate the counselor field
      .populate("counseling"); // Populate the counseling field

    // Check if the counselor profile exists
    if (!counselor) {
      return res
        .status(404)
        .json({ message: "Counselor not found", success: false });
    }

    // Return the counselor profile data
    return res.status(200).json({
      data: counselor,
      success: true,
      message: "the counselor Profiles",
    });
  } catch (error) {
    // Return an error message in case of server issues
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.postCAdvice = async (req, res) => {
  try {
    const userId = req.user._id;
    const { counselorId } = req.body;

    if (req.user.role === "counselor") {
      return res.status(403).json({
        message: "You can't add counselor as student",
        success: false,
      });
    }

    // Add user to counselor's students list
    await UserSchema.findByIdAndUpdate(counselorId, {
      $addToSet: { friends: userId },
    });

    // Add counselor to user's counselor list
    const user = await UserSchema.findByIdAndUpdate(userId, {
      $addToSet: { friends: counselorId },
    });

    return res.status(200).json({
      message: "Advice purchased successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.postCreateCounseling = async (req, res, next) => {
  try {
    const { category, duration, price } = req.body;
    //  console.log("executes", req.body)
    const userId = req.user._id;

    const findCounseling = await CreateCounseling.findOne({
      counselorId: userId,
    });

    if (findCounseling) {
      return res
        .status(409)
        .json({ message: "this is already exist", success: false });
    }
    const counseling = new CreateCounseling({
      counselorId: userId,
      category,
      duration,
      price,
    });

    const findUser = await UserSchema.findById(userId);
    findUser.counseling = counseling._id;
    await findUser.save();
    await counseling.save();
    return res
      .status(200)
      .json({ message: "counseling Created", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.getUCounselors = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await UserSchema.findById(userId).populate("friends");
    return res
      .status(200)
      .json({ data: user, success: true, message: "User Friends list" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: true });
  }
};
