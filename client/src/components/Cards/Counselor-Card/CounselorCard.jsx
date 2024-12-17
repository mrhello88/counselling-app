// import { useAuth } from "../../store/auth";
import React from "react";
import { FaEnvelope, FaBriefcase } from "react-icons/fa";
import { LiaCcMastercard } from "react-icons/lia";
import { TbCategoryPlus } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
export const CounselorCard = ({
  counselorData,
  handlCounselorProfile,
  toggleCounselor,
}) => {
  return (
    <div className="bg-primary space-y-3 shadow-md rounded-lg p-4 flex flex-col items-center">
      <img
        src={`http://localhost:3000/images/${counselorData?.profile}`} // Default profile image
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4 shadow-lg"
      />
      <h3 className="text-3xl font-bold text-secondary">
        {counselorData.personalInfo?.name}
      </h3>

      <div className="font-semibold text-white text-xl flex flex-col space-y-2 ">
        {/* Education and Experience */}
        <div className="flex items-center justify-between w-full">
          <p className="flex items-center">
            {counselorData.counselor?.education.degree}
          </p>
          <p className="flex items-center">
            <FaBriefcase className="mr-2 text-secondary" />
            {counselorData.counselor?.education.experience}
          </p>
        </div>

        {/* Category and Price */}
        <div className="flex items-center justify-between w-full">
          <p className="flex items-center">
            <TbCategoryPlus className="mr-2 text-secondary" />
            {counselorData.counseling?.category}
          </p>
          <p className="flex items-center">
            <IoPricetagsOutline className="mr-2 text-secondary" />$
            {counselorData.counseling?.price}
          </p>
        </div>

        {/* Email */}
        {/* <p className="mb-2 flex items-center justify-center">
          <FaEnvelope className="mr-2 text-secondary" />
          {counselorData.personalInfo?.email}
        </p> */}

        {/* Status */}
        {toggleCounselor ? (
          <p
            className={`mb-2 flex items-center justify-center ${
              counselorData.status === "active"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            Status: {counselorData.status === "active" ? "Active" : "Disabled"}
          </p>
        ) : null}
      </div>

      <button
        onClick={(e) => handlCounselorProfile(e, counselorData?._id)}
        className="py-2 px-[7rem] rounded-md text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
      >
        Profile
      </button>
      {toggleCounselor ? (
        <button
          onClick={(e) => toggleCounselor(e, counselorData?._id)}
          className={`mt-4 py-2 px-[7rem] rounded-md font-bold text-xl duration-300 hover:scale-110 ${
            counselorData.status === "disabled"
              ? "bg-green-500 hover:bg-green-600 hover:text-white"
              : "bg-red-500 hover:bg-red-600 hover:text-white"
          }`}
        >
          {counselorData.status === "active" ? "Disable" : "Activate"}
        </button>
      ) : null}
    </div>
  );
};
