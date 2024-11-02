import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, LogoutUser, userAuthentication, user } = useAuth();
  const { userData } = user;
  useEffect(() => {
    userAuthentication();
  }, [isLoggedIn]);
  return (
    <div >
    
      {/* responsive */}
      <nav className="w-full z-50 bg-opacity-90 shadow-md flex  justify-center items-center">
        <div className="container dark:bg-primary shadow-md p-4 sticky transition-colors duration-300 gap-20 mx-auto flex  justify-between items-center font-bold">
          <NavLink
            to="/"
            className="text-2xl font-bold text-secondary hover:scale-110 duration-300"
          >
            StudentCounsel
          </NavLink>
          <div className="w-full md:w-2/3 flex items-center justify-between text-white">
            <div className="space-x-4 text-lg dark:text-white">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-lg transform transition ${isActive ? "text-secondary scale-115" : "hover:scale-125 hover:text-secondary"}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `text-lg transform transition ${isActive ? "text-secondary scale-115" : "hover:scale-125 hover:text-secondary"}`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-lg transform transition ${isActive ? "text-secondary scale-115" : "hover:scale-125 hover:text-secondary"}`
                }
              >
                About Us
              </NavLink>
              <NavLink
              to="/user-dashboard"
              className={({ isActive }) =>
                `text-lg  transform transition ${isActive ? "text-secondary scale-115" : "hover:scale-125 hover:text-secondary"
                }`
              }
            //className=" text-lg dark:text-white hover:text-secondary transition-colors"
            >
              Counselors
            </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-lg transform transition ${isActive ? "text-secondary scale-115" : "hover:scale-125 hover:text-secondary"}`
                }
              >
                Contact
              </NavLink>
            </div>

            <div className="flex ml-auto">
              {isLoggedIn && (
                <>
                  {userData.role === "student" && userData.friends.length > 0 ? (
                    // Additional UI for students
                    <></>
                  ) : null}
                  {userData.role === "counselor" ? (
                    // Additional UI for counselors
                    <></>
                  ) : null}
                </>
              )}

              {/* CTA Button */}
              <div className="hidden md:flex text-lg pb-2 font-bold">
                {isLoggedIn ? (
                  <NavLink
                    to="/"
                    onClick={() => { LogoutUser(); }}
                    className="mx-12 bg-secondary px-4 py-2 rounded text-white text-lg dark:text-primary hover:text-white transition-colors hover:scale-110 duration-300"
                  >
                    Log Out
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="text-white mx-12 hover:scale-110 px-4 py-2 rounded bg-secondary text-lg dark:text-primary hover:text-white transition-colors duration-300"
                    >
                      Log In
                    </NavLink>

                    <NavLink
                      to="/register"
                      className="bg-secondary text-lg text-white dark:text-primary px-4 py-2 rounded hover:text-white transition-colors hover:scale-110 duration-300"
                    >
                      Book session
                    </NavLink>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white bg-secondary"
                onClick={() => setIsOpen(!isOpen)}>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-primary">
            <NavLink
              to="/"
              className="block text-white py-2 px-4 hover:bg-[#1e293b]"
            >
              Home
            </NavLink>
            <NavLink
              to="/user-dashboard"
              className="block text-white py-2 px-4 hover:bg-[#1e293b]"
            >
              User
            </NavLink>
            <NavLink
              to="/about"
              className="block text-white py-2 px-4 hover:bg-[#1e293b]"
            >
              About
            </NavLink>
            <NavLink
              to="/register"
              className="block text-white py-2 px-4 hover:bg-[#1e293b]"
            >
              Register
            </NavLink>
            <NavLink
              to="/contact"
              className="block text-white py-2 px-4 hover:bg-[#1e293b]"
            >
              Contact
            </NavLink>
            <button className="w-full text-left  text-white py-2 px-4 mt-2 hover:bg-[#0ea5e9]">
              Get Started
            </button>
          </div>
        )}
      </nav>
    </div>

    

  );
};
