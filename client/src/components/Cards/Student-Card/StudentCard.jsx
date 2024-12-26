import React from "react";
import { FaEnvelope } from "react-icons/fa";
export const StudentCard = ({
  studentData,
  handleStudentProfile,
  toggleStudent,
}) => {
  return (
    <div className="bg-primary space-y-3 shadow-md rounded-lg p-4 flex flex-col items-center">
      <img
        src={`${process.env.BACKEND_URL}/images/${studentData?.profile}`} // Default profile image
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4 shadow-lg"
      />
      <h3 className="text-3xl font-bold text-secondary">
        {studentData.personalInfo?.name}
      </h3>

      <div className="font-semibold text-white text-xl flex flex-col space-y-2 ">
        <p className="mb-2 flex items-center justify-center">
          <FaEnvelope className="mr-2 text-secondary" />
          {studentData.personalInfo?.email}
        </p>
        {/* Display Status */}
        <p
          className={`mb-2 flex items-center justify-center ${
            studentData.status === "active" ? "text-green-500" : "text-red-500"
          }`}
        >
          Status: {studentData.status === "active" ? "Active" : "Disabled"}
        </p>
      </div>

      <button
        onClick={(e) => handleStudentProfile(e, studentData?._id)}
        className="py-2 px-[7rem] rounded-md text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
      >
        Profile
      </button>
      {toggleStudent ? (
        <button
          onClick={(e) => toggleStudent(e, studentData?._id)}
          className={`mt-4 py-2 px-[7rem] rounded-md font-bold text-xl duration-300 hover:scale-110 ${
            studentData.status === "disabled"
              ? "bg-green-500 hover:bg-green-600 hover:text-white"
              : "bg-red-500 hover:bg-red-600 hover:text-white"
          }`}
        >
          {studentData.status === "active" ? "Disable" : "Activate"}
        </button>
      ) : null}
    </div>
  );
};
