import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { CounselorCard } from "../Counselor-Card/CounselorCard";

export const CounselorList = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { getCounselors } = useAuth();
  // Dummy data for counselors

  const [counselors, setCounselors] = useState([]);
  useEffect(() => {
    const counselorList = async () => {
      const data = await getCounselors();
      setCounselors(data || []);
    };
    counselorList();
  }, [getCounselors]);
  if (!counselors) {
    return <p>Loading... at counselorList</p>;
  }

  // Dummy filter states (no actual functionality yet)
  const [filters, setFilters] = useState({
    category: "",
    experience: "", 
    price: "",
  });

  const handlCounselorProfile = async (e,counselorId) => {
    e.preventDefault();
    navigate(`/counselor-profile/${counselorId}`);
    console.log("this executes")
  };
  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <aside className="w-1/4 p-4 bg-gray-100">
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
            <option value="Career Counseling">Career Counseling</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Relationship Counseling">
              Relationship Counseling
            </option>
          </select>
        </div>

        {/* Filter by Experience */}
        <div className="mb-4">
          <label className="block font-semibold">Experience</label>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Years of experience"
            value={filters.experience}
            onChange={(e) =>
              setFilters({ ...filters, experience: e.target.value })
            }
          />
        </div>

        {/* Filter by Price */}
        <div className="mb-4">
          <label className="block font-semibold">Price per session</label>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Max price"
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          />
        </div>
      </aside>

      {/* Counselor Cards */}
      <main className="w-3/4 p-4">
        <h2 className="text-2xl font-semibold mb-6">Counselor's List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {counselors.map((counselor) => (
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
