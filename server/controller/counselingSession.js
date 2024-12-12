const UserSchema = require("../model/User");
const CounselingSession = require("../model/counselingSession"); // Example model
const sendMail = require("../utils/nodeMailer");
exports.getCounselorProfile = async (req, res, next) => {
  try {
    // Find the user by ID and populate both the counselor and counseling references
    const counselorProfile = await UserSchema.findById(req.params.counselorId)
      .populate("counselor") // Populate the counselor field
      .populate("counseling"); // Populate the counseling field

    // Check if the counselor profile exists
    if (!counselorProfile) {
      return res
        .status(404)
        .json({ message: "Counselor not found", success: false });
    }

    // Return the counselor profile data
    return res.status(200).json({
      data: counselorProfile,
      message: "Counselor Found",
      success: true,
    });
  } catch (error) {
    // Return an error message in case of server issues
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.postscheduleCounseling = async (req, res) => {
  try {
    const { counselorId, startDate, endDate, duration } = req.body;

    if (req.user.role === "counselor" || "admin") {
      return res.status(403).json({
        message: `${req.user.role} can't create session`,
        success: false, 
      });
    }
    const counselor = await UserSchema.findById(counselorId);
    if (!counselor) {
      res.status(404).json({ message: "counselor not found", success: false });
    }

    // Check if a session between the student and counselor already exists
    const existingSession = await CounselingSession.findOne({
      counselorId,
      studentId: req.user._id,
    });
    // If session exists, update it
    if (existingSession) {
      existingSession.startDate = startDate;
      existingSession.endDate = endDate;
      existingSession.duration = duration;
      await existingSession.save();

      return res.status(200).json({
        message: "Counseling session updated successfully",
        data: existingSession,
        success: true,
      });
    }

    // If session doesn't exist, create a new one
    const session = new CounselingSession({
      counselorId,
      studentId: req.user._id, // Assuming the student is logged in
      startDate,
      endDate,
      duration,
    });

    await session.save();
    sendMail(counselor.personalInfo.email, "", "counselor");
    sendMail(req.user.personalInfo.email, "", "student");
    return res.status(200).json({
      message: "Counseling session scheduled successfully",
      success: true,
      data: session,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to schedule counseling session",
      success: true,
    });
  }
};

exports.getscheduleCounseling = async (req, res, next) => {
  try {
    const counselorId = req.params.counselorId;
    const studentId = req.user._id;
    const isStudentRequest = req.user.role === "student";

    // Define the session query based on the user's role
    const sessionQuery = isStudentRequest
      ? { counselorId, studentId } // Student request, upcoming sessions only
      : {
          counselorId: studentId,
          studentId: counselorId,
        };
    // Counselor request, upcoming sessions only

    // Find the soonest upcoming session
    const counselingSession = await CounselingSession.findOne(sessionQuery);

    if (!counselingSession) {
      return res.status(404).json({
        message: "No upcoming counseling session found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "counseling session",
      data: counselingSession,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to schedule counseling session",
      success: false,
    });
  }
};
