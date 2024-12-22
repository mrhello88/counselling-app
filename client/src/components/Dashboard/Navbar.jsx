import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons
import { LoadingOverlay } from "../Loading/Loading";
const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const { isLoggedIn, fetchData, apiLoading } = useAuth();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const responseData = await fetchData("http://localhost:3000/user");
        if (responseData.success) {
          setUserData(responseData.data || {});
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("An unexpected error occurred while fetching user data.");
      }
    };
    // Call the async function inside useEffect
    fetchingData();
  }, [isLoggedIn, fetchData]);
  // if (apiLoading) {
  //   return <LoadingOverlay />;
  // }
  return (
    <div className="flex justify-between items-center py-2 bg-gray-900 px-8">
      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden p-4 text-white"
        onClick={toggleSidebar} // Toggle sidebar visibility
      >
        {isSidebarOpen ? (
          <FaTimes size={24} /> // Show the close icon when the sidebar is open
        ) : (
          <FaBars size={24} /> // Show the hamburger icon when the sidebar is closed
        )}
      </button>
      {/* Dashboard Name */}
      <div className="text-xl capitalize font-bold">
        <h1 className="text-secondary">
          Dashboard:{" "}
          <span className="text-white">{userData?.personalInfo?.name}</span>
        </h1>
      </div>


      {/* User Profile */}
      <div className="hover:bg-gray-50 rounded-full">
        {userData?.role === "counselor" ? (
          <Link to={"/profile/counselor"}>
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={`http://localhost:3000/images/${userData?.profile}`}
              alt="Profile"
            />
          </Link>
        ) : userData?.role === "admin" ? (
          <Link to={"/profile/admin"}>
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={`http://localhost:3000/images/${userData?.profile}`}
              alt="Profile"
            />
          </Link>
        ) : (
          <Link to={"/profile/student"}>
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={`http://localhost:3000/images/${userData?.profile}`}
              alt="Profile"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
