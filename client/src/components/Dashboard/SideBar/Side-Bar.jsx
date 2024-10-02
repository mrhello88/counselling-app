import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../store/auth";

export const SideBar = ({onSelectChat}) => {
  const { user, userAuthentication, userFriends } = useAuth();
  const { friends,userData } = user

  useEffect(() => {
    userAuthentication()
    userFriends(userData?._id)
  }, [userData?._id]);

  return (
    <div className="p-4 bg-black h-full">
      <div className="flex items-center">
        <img
          className="w-12 rounded-full mr-4"
          src="/src/assets/reactIcon.png"
          alt="demy logo"
        />
        <span className="text-white text-sm font-medium">Website Name</span>
      </div>
      {/* <div className="my-8">
        <Link to="#" className="text-white text-xl">
          Dashboard
        </Link>
      </div> */}
      <div className="relative my-8">
        <h2 className="text-white text-xl">{friends?.role == "counselor"? "Student'S":"Counselor'S"}</h2>
        <ul className="max-h-52 overflow-y-scroll scrollbar-hide shadow-lg rounded-lg my-4">
          {friends?.friends?.map((items, index) => (
            <li
              className="my-4 text-white text-sm"
              key={index}
              onClick={() => onSelectChat(items , userData?._id)}
            >
              <div className="flex items-center">
                <img
                  className="w-12 rounded-full mr-4"
                  src="/src/assets/reactIcon.png"
                  alt="demy profile"
                />
                <div className="text-white">
                  <p>{items?.name}</p>
                  <span>last message</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-8">
        <Link to="#" className="text-white text-xl">
          Book Library
        </Link>
      </div>
      <div className="mb-4">
        <Link to="#" className="text-white text-xl">
          LogOut
        </Link>
      </div>
    </div>
  );
};
