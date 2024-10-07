import React, { useEffect } from "react";
import { useAuth } from "../../../store/auth";
import { RxAvatar } from "react-icons/rx";
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
        <h1>Dashboard: {userData?.role}</h1>
      </div>
      <div className="hover:bg-gray-50 rounded-full">
        <Link to={"/profiles"}>
          <RxAvatar size={52} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
