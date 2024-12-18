import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/Context";
import { MdCreate } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaBook, FaUserGraduate, FaUserTie, FaHome } from "react-icons/fa";
import { MdUploadFile } from "react-icons/md"; // Example Material Design Icon
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
              <div className="my-8">
                <Link
                  to={"/dashboard"}
                  className="text-2xl flex items-center gap-4"
                >
                  <FaHome className="text-secondary" size={24} />
                  <span className="text-white font-bold hover:text-secondary hover:scale-110 duration-300 ml-4 text-2xl">
                    Home
                  </span>
                </Link>
              </div>

              <div className="my-8">
                <Link
                  to={"/dashboard/admin-counselor"}
                  className="text-2xl flex items-center gap-4"
                >
                  <FaUserTie className="text-secondary" size={24} />
                  <span className="text-white font-bold hover:text-secondary hover:scale-110 duration-300 ml-4 text-2xl">
                    Counselor
                  </span>
                </Link>
              </div>

              <div className="my-8">
                <Link
                  to={"/dashboard/admin-student"}
                  className="text-2xl flex items-center gap-4"
                >
                  <FaUserGraduate className="text-secondary" size={24} />
                  <span className="text-white font-bold hover:text-secondary hover:scale-110 duration-300 ml-4 text-2xl">
                    Student
                  </span>
                </Link>
              </div>

              <div className="">
                <Link
                  to={"/dashboard/upload-book"}
                  className="text-2xl flex items-center gap-4"
                >
                  <MdUploadFile className="text-secondary" size={24} />
                  <span className="text-white font-bold hover:text-secondary hover:scale-110 duration-300 ml-4 text-2xl">
                    Upload Book
                  </span>
                </Link>
              </div>
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
      {(userData?.role === "student" || userData?.role === "admin") && (
        <div className="my-8 ">
          <Link
            to="/dashboard/book-library"
            className="text-2xl flex items-center gap-4"
          >
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
