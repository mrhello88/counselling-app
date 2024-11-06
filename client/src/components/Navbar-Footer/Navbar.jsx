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
    <nav className="bg-primary p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex justify-between items-center space-x-52 ">
          <div className="text-secondary font-bold text-xl pl-5 duration-300 hover:scale-125">
            <h2 className="text-2xl cursor-pointer">StudentCounselor</h2>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-lg font-bold w-full h-12 items-center">
          <NavLink
              to="/"
              className={({ isActive }) =>
                ` ${isActive ? "text-white hover:text-secondary scale-115" : "hover:scale-125 text-secondary"
                  // "text-secondary hover:text-white scale-115" : "hover:scale-125 text-secondary"
                }`
              }
            >
              Home
            </NavLink>

            {isLoggedIn && (
              <>
                {userData.role === "student" && userData.friends.length > 0 ? (
                  <>
                    <NavLink
                      to="/user-dashboard"
                      className={({ isActive }) =>
                        ` ${isActive ? "text-white hover:text-secondary scale-115" : "hover:scale-125 text-secondary"
                          // "text-secondary hover:text-white scale-115" : "hover:scale-125 text-secondary "
                        }`
                      }
                    >
                      User
                    </NavLink>
                  </>
                ) : null}
                {userData.role === "counselor" ? (
                  <>
                    <NavLink
                      to="/user-dashboard"
                      className={({ isActive }) =>
                        ` ${isActive ? "text-white hover:text-secondary scale-115" : "hover:scale-125  text-secondary"
                          // "text-secondary hover:text-white scale-115" : "hover:scale-125 text-secondary"
                        }`
                      }
                    >
                      User
                    </NavLink>
                  </>
                ) : null}
              </>
            )}

            <NavLink
              to="/counselorList"
              className={({ isActive }) =>
                ` ${isActive ? "text-white hover:text-secondary scale-115" : "hover:scale-125 text-secondary"
                }`
              }
            >
              Counselors
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` ${isActive ? "text-white hover:text-secondary scale-115" : "hover:scale-125 text-secondary"
                }`
              }
            >
            Service
            </NavLink>
            <NavLink
              to=""
              className={({ isActive }) =>
                ` ${isActive ? "text-white hover:text-secondary scale-115" : "hover:scale-125 text-secondary"
                }`
              }
            >
            About Us
            </NavLink>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex text-lg">
          {isLoggedIn ? (
            <>
              <NavLink
                to={"/"}
                onClick={() => {
                  LogoutUser();
                }}
                className="hidden md:block  mx-12  px-4 py-2 rounded text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
              >
                Log Out
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={"/login"}
                className="hidden md:block mx-12 px-4 py-2 rounded text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
              >
                Log In
              </NavLink>

              <NavLink
                to="/register"
                className="hidden md:block px-4 py-2 rounded  text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
              >
                Book a session
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2">
          <a href="/" className="block py-2 px-4 hover:bg-secondary text-primary">
            Home
          </a>
          <a
            href="/user-dashboard"
            className="block py-2 px-4 hover:bg-secondary text-primary"
          >
            User
          </a>
          <a
            href="/about"
            className="block py-2 px-4 hover:bg-secondary text-primary"
          >
            About
          </a>
          <a href="#" className="block py-2 px-4 hover:bg-secondary text-primary">
            Register
          </a>
          <a
            href="/register"
            className="block py-2 px-4 hover:bg-secondary text-primary"
          >
            Contact
          </a>
          <button className="w-full text-left bg-[#38bdf8] text-white py-2 px-4 mt-2 hover:bg-[#0ea5e9]">
           Book a Session
          </button>
        </div>
      )}
    </nav>
  );
};