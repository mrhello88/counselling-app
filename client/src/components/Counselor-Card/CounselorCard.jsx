// import { useAuth } from "../../store/auth";
import React from "react";
import { FaEnvelope, FaBriefcase } from "react-icons/fa";
import { LiaCcMastercard } from "react-icons/lia";
import { TbCategoryPlus } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
export const CounselorCard = ({ counselorData, handlCounselorProfile }) => {
  return (
    <div className="bg-primary space-y-3  shadow-md rounded-lg p-4 flex flex-col items-center">
      <img
        src={`http://localhost:3000/images/${counselorData?.profile}`} // Default profile image
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4 shadow-lg"
      />
      <h3 className="text-3xl font-bold text-secondary">
        {counselorData.personalInfo?.name}
      </h3>
      {/* <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faEnvelope} />
          <a href={`mailto:${counselorData.personalInfo?.email}`} className="text-teal-600 hover:underline">
            {counselorData.personalInfo?.email || 'example@gmail.com'}
          </a>
        </div> */}

      <div className="font-semibold text-white text-xl flex flex-col space-y-2 ">
        <div className="flex items-center justify-between w-full ">
          <p className="flex items-center">
            {counselorData.counselor?.education.degree}
          </p>
          <p className="flex items-center">
            {" "}
            <FaBriefcase className="mr-2 text-secondary" />{" "}
            {counselorData.counselor?.education.experience}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="flex items-center">
            <TbCategoryPlus className="mr-2 text-secondary" />{" "}
            {counselorData.counseling?.category}
          </p>
          <p className="flex items-center">
            <IoPricetagsOutline className="mr-2 text-secondary" />$
            {counselorData.counseling?.price}
          </p>
        </div>
        <p className="mb-2 flex items-center justify-center">
          <FaEnvelope className=" mr-2 text-secondary" />{" "}
          {counselorData.personalInfo?.email}
        </p>
      </div>

      <button
        onClick={(e) => handlCounselorProfile(e, counselorData?._id)}
        className="py-2 px-[7rem] rounded-md  text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
      >
        Profile
      </button>
    </div>
  );
};
