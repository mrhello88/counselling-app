import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Context";
import { CounselorCard } from "../Cards/Counselor-Card/CounselorCard";
import { LoadingOverlay } from "../Loading/Loading";
import { toast } from "react-toastify";
export const CounselorList = () => {
  const navigate = useNavigate(); // Initialize navigate
  // const { getCounselors, fetchData, apiLoading } = useAuth();
  const { fetchData, apiLoading, isLoggedIn } = useAuth();
  // Dummy data for counselors

  const [counselors, setCounselors] = useState([]);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const responseData = await fetchData(
          `http://localhost:3000/counselors`
        );
        if (responseData.success) {
          setCounselors(responseData.data || []);
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error("An unexpected error occurred while counselors list");
      }
    };
    fetchingData();
  }, [fetchData, isLoggedIn]);
  // Dummy filter states (no actual functionality yet)
  const [filters, setFilters] = useState({
    category: "",
    experience: "",
    price: "",
  });

  const handlCounselorProfile = async (e, counselorId) => {
    e.preventDefault();
    navigate(`/counselor-profile/${counselorId}`);
  };

  // if (apiLoading) {
  //   return <LoadingOverlay />;
  // }

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <aside className="w-1/4 p-4 bg-gray-400 ">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        {/* Filter by Category */}
        <div className="mb-4">
          <label className="block font-semibold">Category</label>
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All</option>
            <option value="mental_health">Mental Health</option>
            <option value="career_counseling">Career Counseling</option>
            <option value="scholarship_counseling">
              Scholarship Counseling
            </option>
          </select>
        </div>

        {/* Filter by Experience */}
        <div className="mb-4">
          <label className="block font-semibold">Experience</label>
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            value={filters.experience}
            onChange={(e) =>
              setFilters({ ...filters, experience: e.target.value })
            }
          >
            <option value="" disabled>
              Select Experience
            </option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="3 years">3 years</option>
            <option value="4 years">4 years</option>
            <option value="5 years">5 years</option>
            <option value="5-10 years">5 to 10 years</option>
          </select>
        </div>

        {/* Filter by Price */}
        <div className="mb-4">
          <label className="block font-semibold">Price per session upto</label>
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">Any</option>
            <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
            <option value="200">Up to $200</option>
            <option value="500">Up to $500</option>
          </select>
        </div>
      </aside>

      {/* Counselor Cards */}
      <main className="w-3/4 p-4 ">
        <h2 className="text-2xl font-semibold mb-6">Counselor's List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {counselors
            .filter((counselor) => {
              // Exclude counselors with "disabled" status
              if (counselor.status === "disabled") {
                return false;
              }

              // Filter by Category
              if (
                filters.category &&
                counselor.counseling?.category !== filters.category
              ) {
                return false;
              }

              // Filter by Experience
              if (filters.experience) {
                const selectedExperience = parseInt(filters.experience);
                const counselorExperience = parseInt(
                  counselor.counselor?.education?.experience
                );

                if (selectedExperience === 1 && counselorExperience < 1)
                  return false;
                if (selectedExperience === 2 && counselorExperience < 2)
                  return false;
                if (selectedExperience === 3 && counselorExperience < 3)
                  return false;
                if (selectedExperience === 4 && counselorExperience < 4)
                  return false;
                if (selectedExperience === 5 && counselorExperience < 5)
                  return false;
                if (selectedExperience === 6 && counselorExperience < 6)
                  return false;
                if (selectedExperience === 7 && counselorExperience < 10)
                  return false;
              }

              // Filter by Price
              if (filters.price) {
                const selectedPrice = parseInt(filters.price);
                if (counselor.counseling?.price > selectedPrice) {
                  return false;
                }
              }

              return true; // Return true if all conditions pass
            })
            .map((counselor) => (
              <CounselorCard
                key={counselor._id}
                handlCounselorProfile={handlCounselorProfile}
                counselorData={counselor}
              />
            ))}
        </div>
      </main>
    </div>
  );
};
