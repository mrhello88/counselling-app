import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Context";
import { toast } from "react-toastify";
import { LoadingOverlay } from "../Loading/Loading";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, fetchData, apiLoading, LogoutUser, refreshFlag } =
    useAuth();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const responseData = await fetchData(`${process.env.BACKEND_URL}/api/user`);
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
  }, [isLoggedIn, fetchData, refreshFlag]);
  // if (apiLoading) {
  //   return apiLoading && <LoadingOverlay />;
  // }
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <div className="text-secondary font-bold text-xl duration-300 hover:scale-125">
            <h2 className="text-2xl cursor-pointer">StudentCounselor</h2>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-wrap space-x-6 text-lg font-bold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-white hover:text-secondary scale-115"
                    : "hover:scale-125 text-secondary"
                }`
              }
            >
              Home
            </NavLink>

            {isLoggedIn && userData.role && (
              <>
                {(userData.role === "student" && userData.friends.length > 0) ||
                userData.role === "counselor" ||
                userData.role === "admin" ? (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-white hover:text-secondary scale-115"
                          : "hover:scale-125 text-secondary"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                ) : null}
              </>
            )}

            <NavLink
              to="/counselorList"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-white hover:text-secondary scale-115"
                    : "hover:scale-125 text-secondary"
                }`
              }
            >
              Counselors
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-white hover:text-secondary scale-115"
                    : "hover:scale-125 text-secondary"
                }`
              }
            >
              About Us
            </NavLink>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex text-lg space-x-4">
          {isLoggedIn && userData.role ? (
            <NavLink
              to="/"
              onClick={LogoutUser}
              className="px-4 py-2 rounded text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
            >
              Log Out
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
              >
                Log In
              </NavLink>

              <NavLink
                to="/register"
                className="px-4 py-2 rounded text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
              >
                Book a session
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-2 space-y-2">
          <NavLink
            to="/"
            className="block py-2 px-4 hover:bg-secondary text-white"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          {isLoggedIn && userData.role && (
            <>
              {userData.role === "student" && userData.friends.length > 0 ? (
                <NavLink
                  to="/dashboard"
                  className="block py-2 px-4 hover:bg-secondary text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
              ) : null}

              {(userData.role === "counselor" || userData.role === "admin") && (
                <NavLink
                  to="/dashboard"
                  className="block py-2 px-4 hover:bg-secondary text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
              )}
            </>
          )}

          <NavLink
            to="/counselorList"
            className="block py-2 px-4 hover:bg-secondary text-white"
            onClick={() => setIsOpen(false)}
          >
            Counselors
          </NavLink>
          <NavLink
            to="/about"
            className="block py-2 px-4 hover:bg-secondary text-white"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </NavLink>

          {isLoggedIn && userData.role ? (
            <button
              onClick={() => {
                LogoutUser();
                setIsOpen(false);
              }}
              className="w-full text-left bg-[#38bdf8] text-white py-2 px-4 hover:bg-[#0ea5e9]"
            >
              Log Out
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block bg-secondary text-primary py-2 px-4 rounded hover:bg-primary hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="block bg-secondary text-primary py-2 px-4 rounded hover:bg-primary hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Book a Session
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
