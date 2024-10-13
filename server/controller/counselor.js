// const CounselorSchema = require("../model/Counselor");
const CreateCounseling = require("../model/CreateCounseling");
const User = require("../model/User");
const UserSchema = require("../model/User");
exports.getCounselor = async (req, res) => {
  try {
    const counselors = await UserSchema.find({ role: "counselor" }); // Fetch all counselors
    res.status(200).json(counselors);
    // console.log(counselors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.postCAdvice = async (req, res) => {
  const userId = req.user._id;
  const { counselorId } = req.body;

  if (userId.toString() === counselorId.toString()) {
    return res
      .status(400)
      .json({ message: "You can't add your self as counselor" });
  }

  try {
    // Add user to counselor's students list
    await UserSchema.findByIdAndUpdate(counselorId, {
      $addToSet: { friends: userId },
    });

    // Add counselor to user's counselor list
    await UserSchema.findByIdAndUpdate(userId, {
      $addToSet: { friends: counselorId },
    });

    res.status(200).json({ message: "Advice purchased successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.postCreateCounseling = async (req, res, next) => {
  try {
    const { category, duration, price } = req.body;
    //  console.log("executes", req.body)
    const userId = req.user._id;

    const findCounseling = await CreateCounseling.findById(userId);

    if (findCounseling) {
      return res.status(409).json({ msg: "this is already exist" });
    }

    const counseling = new CreateCounseling({
      category,
      duration,
      price,
    });

    const findUser = await UserSchema.findById(userId);
    findUser.counseling = counseling._id; 
    await findUser.save();
    await counseling.save();
    return res.status(200).json({ msg: "counseling Created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUCounselors = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await UserSchema.findById(userId).populate("friends");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
