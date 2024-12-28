import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/Context"; // Assuming useAuth is in hooks folder
import { CounselorCard } from "../../../Cards/Counselor-Card/CounselorCard";
import { useNavigate } from "react-router-dom";
export const AdminCounselorPage = () => {
  const { fetchData, postData, isLoggedIn } = useAuth();
  const [counselors, setCounselors] = useState([]);
  const navigate = useNavigate(); // Initialize navigate
  // Fetch counselors from the backend
  const fetchCounselors = async () => {
    try {
      const responseData = await fetchData(`${process.env.BACKEND_URL}/api/counselors`);
      if (responseData.success) {
        setCounselors(responseData.data || []);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error fetching counselors:", error);
    }
  };
  useEffect(() => {
    fetchCounselors();
  }, [fetchData, isLoggedIn]);

  // Delete a counselor
  const toggleCounselor = async (e, counselorId) => {
    e.preventDefault();
    try {
      const responseData = await fetchData(
        `${process.env.BACKEND_URL}/api/toggleStatus/${counselorId}`
      );
      if (responseData.success) {
        await fetchCounselors();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handlCounselorProfile = async (e, counselorId) => {
    e.preventDefault();
    navigate(`/dashboard/admin-counselor-profile/${counselorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Admin - Manage Counselors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {counselors.map((counselor) => (
          <>
            <CounselorCard
              key={counselor._id}
              handlCounselorProfile={handlCounselorProfile}
              toggleCounselor={toggleCounselor}
              counselorData={counselor}
            />
          </>
        ))}
      </div>
      {counselors.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No counselors found.</p>
      )}
    </div>
  );
};
