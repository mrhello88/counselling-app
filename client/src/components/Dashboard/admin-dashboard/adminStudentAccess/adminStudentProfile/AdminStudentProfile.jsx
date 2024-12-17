import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../../context/Context";
import { useParams } from "react-router-dom";

export const AdminStudentProfile = () => {
  const [profileData, setProfileData] = useState({});
  const { fetchData, apiLoading, isLoggedIn } = useAuth();
  const { studentId } = useParams();

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const responseData = await fetchData(
          `http://localhost:3000/counselorProfile/${studentId}`
        );
        if (responseData.success) {
          setProfileData(responseData.data || {});
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error("An unexpected error occurred while fetching profile data");
      }
    };
    fetchingData();
  }, [fetchData, isLoggedIn]);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6">Student Profile</h2>

      {/* Personal Info */}
      <div className="mb-4">
        <img
          src={`http://localhost:3000/images/${profileData?.profile}`} // Default profile image
          alt="Student"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="text-2xl font-semibold">
          {profileData.personalInfo?.name}
        </h3>
        <p className="text-gray-600">{profileData.personalInfo?.email}</p>
      </div>

      {/* Navigation Link */}
      <div className="mt-8 flex justify-center">
        <Link
          to="/dashboard/admin-student"
          className="py-2 px-6 rounded-md bg-secondary text-primary hover:text-white font-bold text-lg duration-300 hover:scale-105"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
