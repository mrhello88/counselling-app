import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { FaBook } from "react-icons/fa";

export const SideBar = ({ onSelectChat }) => {
  const { user, userAuthentication, userFriends } = useAuth();
  const { friends, userData } = user;
  const [activeUser, setActiveUser] = useState("");

  useEffect(() => {
    userAuthentication();
    userFriends(userData?._id);
  }, [userData?._id]);

  const useClickHandler = (items) => {
    onSelectChat(items, userData?._id);
    console.log(
      userData?.friends.indexOf(items?._id),
      "user data with i don't know"
    );
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
                  activeUser === index ? "bg-white text-black" : "text-white bg-gray-600"
                }  hover:text-black hover:bg-white p-2 rounded`}
                key={index}
                onClick={() => useClickHandler(items)}
              >
                <div className="flex items-center justify-start cursor-pointer gap-4">
                  {/* {activeUser !== index ? "bg-white text-black" : "text-white"} */}
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src={
                      `http://localhost:3000/images/${items?.profile}`
                    }
                    alt="Profile"
                  />
                  <div className="text-base">
                    <p className="capitalize">{items?.personalInfo?.name}</p>
                    <span>{items?.personalInfo?.email}</span>
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
