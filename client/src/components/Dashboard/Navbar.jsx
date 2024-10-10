import React, { useEffect } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, userAuthentication } = useAuth();
  const { userData } = user;
  useEffect(() => {
    userAuthentication();
  }, []);
  console.log("userData = ", userData);
  return (
    <div className="flex justify-between items-center py-2 bg-gray-200 px-8 ">
      <div className="text-xl capitalize font-bold">
        <h1>Dashboard: {userData?.personalInfo?.name}</h1>
      </div>
      <div className="hover:bg-gray-50 rounded-full">
        {userData?.role === "counselor" ? (
          <Link to={"/profile/counselor"}>
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
