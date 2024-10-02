// const CounselorSchema = require("../model/Counselor");
const UserSchema = require("../model/User");
exports.getCounselor = async (req, res) => {
  try {
    const counselors = await UserSchema.find({role:"counselor"}); // Fetch all counselors
    res.status(200).json(counselors);
    // console.log(counselors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.postCAdvice = async (req, res) => {
  const { userId, counselorId } = req.body;

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

exports.getUCounselors = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.userId).populate("friends");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
 