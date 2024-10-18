const UserSchema = require("../model/User");
const CounselingSession = require("../model/counselingSession"); // Example model
const sendMail = require("../utils/nodeMailer");
exports.getCounselorProfile = async (req, res, next) => {
  try {
    // Find the user by ID and populate both the counselor and counseling references
    const counselorProfile = await UserSchema.findById(req.params.userId)
      .populate("counselor") // Populate the counselor field
      .populate("counseling"); // Populate the counseling field

    // Check if the counselor profile exists
    if (!counselorProfile) {
      return res.status(404).json({ message: "Counselor not found" });
    }

    // Return the counselor profile data
    res.status(200).json(counselorProfile);
  } catch (error) {
    // Return an error message in case of server issues
    res.status(500).json({ message: "Server error" });
  }
};

exports.postscheduleCounseling = async (req, res) => {
  const { counselorId, startDate, endDate, duration } = req.body;

  if (counselorId.toString() === req.user._id.toString()) {
    return res.status(403).json({ msg: "counselor can't create own session" });
  }
  const counselor = await UserSchema.findById(counselorId);
  if (!counselor) {
    res.status(404).json({ msg: "counselor not found" });
  }
  try {
    const session = new CounselingSession({
      counselorId,
      studentId: req.user._id, // Assuming the student is logged in
      startDate,
      endDate,
      duration,
      status: "incomplete",
    });

    await session.save();
    res
      .status(200)
      .json({ message: "Counseling session scheduled successfully" });
    sendMail(counselor.personalInfo.email, "counselor");
    sendMail(req.user.personalInfo.email, "student");
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule counseling session" });
  }
};

exports.getscheduleCounseling = async (req, res, next) => {
  try {
    const counselorId = req.params.counselorId;
    const studentId = req.user._id;

    const isStudentRequest = req.user.personalInfo.role === "student"; // Assuming you have roles set for users

    // Handle cases based on who is making the request
    const sessionQuery = isStudentRequest
      ? { counselorId, studentId } // Student making request, use counselorId from params and studentId from req.user
      : { counselorId: studentId, studentId: counselorId }; // Counselor making request, swap counselorId and studentId

    const counselingSession = await CounselingSession.findOne(sessionQuery);
    if (!counselingSession) {
      res.status(404).json({ msg: "Not found"});
    }
    res
      .status(200)
      .json({ msg: "counseling session found", counselingSession });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule counseling session" });
  }
};
