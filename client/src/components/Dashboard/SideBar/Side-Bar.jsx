import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { RxAvatar } from "react-icons/rx";
import { FaBook } from "react-icons/fa";

export const SideBar = ({ onSelectChat }) => {
  const { user, userAuthentication, userFriends } = useAuth();
  const { friends, userData } = user;
  const [activeUser, setActiveUser] = useState(0);

  useEffect(() => {
    userAuthentication();
    userFriends(userData?._id);
  }, [userData?._id]);

  const useClickHandler = (items) => {
    onSelectChat(items, userData?._id);
    setActiveUser(userData?.friends.indexOf(items?._id));
  };
  return (
    <div className="p-4 bg-black h-screen">
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
        <h2 className="text-white text-xl uppercase">
          {friends?.role == "counselor" ? "Student'S" : "Counselor'S"}
        </h2>
        <ul className="max-h-52 overflow-y-scroll scrollbar-hide shadow-lg rounded-lg my-4">
          {friends?.friends?.map((items, index) => (
            <>
              <li
                className={`my-4 text-sm ${
                  activeUser === index + 1
                    ? "bg-white text-black"
                    : "text-white"
                }  hover:text-black hover:bg-white p-2 rounded`}
                key={index}
                onClick={() => useClickHandler(items)}
              >
                <div className="flex items-center justify-start cursor-pointer gap-4">
                  <RxAvatar size={24} />
                  <div className="text-base">
                    <p className="capitalize">{items?.name}</p>
                    <span>last message</span>
                  </div>
                </div>
              </li>
            </>
          ))}
        </ul>
      </div>
      <div className="my-8">
        <Link to="#" className="text-white text-xl flex items-center gap-4">
          <FaBook size={24} />
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
