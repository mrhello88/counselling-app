import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { FaBook } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { MdLogout } from "react-icons/md";
export const SideBar = ({ onSelectChat }) => {
  const { userFriends, token } = useAuth();
  const [userData, setUserData] = useState({});
  const [activeUser, setActiveUser] = useState("");
  useEffect(() => {
    const userFreindeData = async () => {
      const data = await userFriends();
      setUserData(data || {});
    };
    userFreindeData();
  }, [userFriends, token]);
  const useClickHandler = (items) => {
    onSelectChat(items, userData?._id);
    setActiveUser(userData?.friends.indexOf(items));
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
          {userData?.role == "counselor" ? "Student'S" : "Counselor'S"}
        </h2>
        <ul className="max-h-52 overflow-y-scroll scrollbar-hide shadow-lg rounded-lg my-4">
          {userData?.friends?.map((items, index) => (
            <>
              <Link
                to={"/user-dashboard"}
                className={`my-4 text-sm block ${
                  activeUser === index
                    ? "bg-white text-black"
                    : "text-white bg-gray-600"
                }  hover:text-black hover:bg-white p-2 rounded`}
                onClick={() => useClickHandler(items)}
              >
                <div className="flex items-center justify-start cursor-pointer gap-4">
                  {/* {activeUser !== index ? "bg-white text-black" : "text-white"} */}
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src={`http://localhost:3000/images/${items?.profile}`}
                    alt="Profile"
                  />
                  <div className="text-base">
                    <p className="capitalize">{items.personalInfo?.name}</p>
                    <span>{items.personalInfo?.email}</span>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </ul>
      </div>
      <div className="my-8">
        <Link to="#" className="text-white text-2xl flex items-center gap-4">
          <FaBook size={24} />
          Book Library
        </Link>
      </div>
      {userData?.role === "counselor" && (
        <div className="my-8">
          <Link
            to="/user-dashboard/create-session"
            className="text-white text-2xl flex items-center gap-4"
          >
            <MdCreate size={24} />
            Create Counseling
          </Link>
        </div>
      )}
      <div className="my-8">
        <Link to="#" className="text-white text-2xl flex items-center gap-4">
          <MdLogout size={24} />
          LogOut
        </Link>
      </div>
    </div>
  );
};