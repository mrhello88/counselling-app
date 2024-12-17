import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/Context";
import { FaBook } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { LoadingOverlay } from "../../Loading/Loading";
import { toast } from "react-toastify";
export const SideBar = ({ onSelectChat }) => {
  // const { userFriends, token } = useAuth();
  const { fetchData, apiLoading, isLoggedIn, LogoutUser } = useAuth();
  const [userData, setUserData] = useState({});
  const [activeUser, setActiveUser] = useState("");
  const location = useLocation();
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const responseData = await fetchData(
          `http://localhost:3000/user/friends`
        );
        if (responseData.success) {
          setUserData(responseData.data || {});
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error("An unexpected error occurred while friends list");
      }
    };
    fetchingData();
  }, [fetchData, isLoggedIn]);
  const useClickHandler = (items) => {
    onSelectChat(items, userData?._id);
    setActiveUser(userData?.friends.indexOf(items));
  };

  // if (apiLoading) {
  //   return <LoadingOverlay />;
  // }
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
      <div className="relative my-4">
        <h2 className="text-3xl font-bold  text-secondary hover:scale-110 duration-300 pl-4 uppercase ">
          {userData?.role == "counselor"
            ? "Student'S"
            : userData?.role == "admin"
            ? "admin"
            : "Counselor'S"}
        </h2>
        <ul className="max-h-[18rem] overflow-y-scroll scrollbar-hide shadow-lg rounded-lg my-4">
          {userData?.role == "admin" ? (
            <>
              <Link
                to={"/dashboard"}
                className={`my-4 text-sm block p-2 rounded ${
                  location.pathname === "/dashboard"
                    ? "bg-white text-black" // Active link with bg-white
                    : "bg-secondary text-black" // Inactive link with bg-secondary
                } hover:text-black hover:bg-white`}
              >
                Home
              </Link>

              <Link
                to={"/dashboard/admin-counselor"}
                className={`my-4 text-sm block p-2 rounded ${
                  location.pathname === "/dashboard/admin-counselor"
                    ? "bg-white text-black" // Active link with bg-white
                    : "bg-secondary text-black" // Inactive link with bg-secondary
                } hover:text-black hover:bg-white`}
              >
                Counselors
              </Link>

              <Link
                to={"/dashboard/admin-student"}
                className={`my-4 text-sm block p-2 rounded ${
                  location.pathname === "/dashboard/admin-student"
                    ? "bg-white text-black" // Active link with bg-white
                    : "bg-secondary text-black" // Inactive link with bg-secondary
                } hover:text-black hover:bg-white`}
              >
                Student
              </Link>
            </>
          ) : (
            <>
              {userData?.friends?.map((items, index) => (
                <>
                  <Link
                    key={items._id}
                    to={"/dashboard"}
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
            </>
          )}
        </ul>
      </div>
      {userData?.role === "student" && (
        <div className="my-8 ">
          <Link to="#" className=" text-2xl flex items-center gap-4">
            <FaBook className="text-secondary" size={24} />
            <span className="text-white font-bold hover:text-secondary hover:scale-110 duration-300 ml-4 text-2xl">
              Book Library
            </span>
          </Link>
        </div>
      )}
      {userData?.role === "counselor" && (
        <div className="my-8">
          <Link
            to="/dashboard/create-session"
            className="text-secondary text-2xl flex items-center gap-4"
          >
            <MdCreate className="text-secondary" size={24} />
            <span className="text-white font-bold hover:text-secondary hover:scale-110 duration-300 ml-4 text-2xl">
              {" "}
              Create Counseling
            </span>
          </Link>
        </div>
      )}
      <div className="my-8">
        <Link
          to={"/"}
          onClick={() => {
            LogoutUser();
          }}
          className=" flex items-center gap-4"
        >
          <MdLogout className="text-secondary" size={24} />
          <span className="text-white font-bold hover:text-secondary hover:scale-110 duration-300 ml-4 text-2xl">
            LogOut
          </span>
        </Link>
      </div>
    </div>
  );
};
