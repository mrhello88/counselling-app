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
      <div className="flex flex-col sm:flex-row items-center justify-center">
        <img
          className="w-8 sm:w-12 rounded-full mr-4"
          src="/src/assets/reactIcon.png"
          alt="demy logo"
        />
        <span className="text-white text-sm text-center font-medium">
          Counselling
        </span>
      </div>
      {/* <div className="my-8">
        <Link to="#" className="text-white text-xl">
          Dashboard
        </Link>
      </div> */}
      <div className="my-4 w-full">
        <h2 className="lg:text-3xl text-xs font-semibold sm:font-bold  text-secondary hover:scale-110 duration-300 md:text-xl lg:pl-4 uppercase ">
          {userData?.role == "counselor" ? "Student'S" : "Counselor'S"}
        </h2>
        <ul className=" overflow-y-scroll shadow-lg rounded-lg my-4">
          {userData?.friends?.map((items, index) => (
            <>
              <Link
                to={"/user-dashboard"}
                className={`my-4 text-sm block ${
                  activeUser === index < 3
                    ? "bg-white text-black"
                    : "bg-gray-600 text-black"
                } hover:text-black hover:bg-white p-2 rounded`}
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
        <Link to="#" className=" text-2xl flex items-center sm:gap-4">
          <FaBook className="text-secondary" size={24} />
          <span className="text-white font-bold hover:text-secondary hover:scale-110 duration-300 ml-2 sm:ml-4 sm:text-2xl text-xl">
            Book Library
          </span>
        </Link>
      </div>
      {userData?.role === "counselor" && (
        <div className="my-8">
          <Link
            to="/user-dashboard/create-session"
            className="text-secondary text-2xl flex items-center sm:gap-4"
          >
            <MdCreate className="text-secondary" size={24} />
            <span className="text-white font-bold hover:text-secondary hover:scale-110 duration-300 sm:ml-4 sm:text-2xl">
              {" "}
              Create Counseling
            </span>
          </Link>
        </div>
      )}
      <div className="my-8">
        <Link to="#" className=" flex items-center sm:gap-4">
          <MdLogout className="text-secondary" size={24} />
          <span className="text-white font-bold hover:text-secondary hover:scale-110 duration-300 ml-2 sm:ml-4 sm:text-2xl text-xl">
            LogOut
          </span>
        </Link>
      </div>
    </div>
  );
};
