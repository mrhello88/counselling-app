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
    <nav className="bg-[#0f172a] p-4 ">
      <div className="container mx-auto flex justify-between items-center  ">
        {/* Logo */}
        <div className="flex justify-between items-center space-x-8">
          <div className="text-white font-bold text-xl w-[30px] ">
            <img
              className="w- h-12"
              src="../../../public/css/asset/colorfulbird.png"
              alt="logo"
            />
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 text-lg ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` ${
                  isActive
                    ? "hover:text-[#38bdf8] text-white"
                    : " text-[#38bdf8]"
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
                        ` ${
                          isActive
                            ? "hover:text-[#38bdf8] text-white"
                            : " text-[#38bdf8]"
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
                        ` ${
                          isActive
                            ? "hover:text-[#38bdf8] text-white"
                            : " text-[#38bdf8]"
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
                ` ${
                  isActive
                    ? "hover:text-[#38bdf8] text-white"
                    : " text-[#38bdf8]"
                }`
              }
            >
              Counselors
            </NavLink>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex text-lg">
          {isLoggedIn ? (
            <>
              <NavLink
                to={"/"}
                onClick={()=>{LogoutUser()}}
                className="hidden md:block bg-[#38bdf8] mx-12 text-white px-4 py-2 rounded hover:bg-[#0ea5e9]"
              >
                Log Out
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={"/login"}
                className="hidden md:block bg-[#38bdf8] mx-12 text-white px-4 py-2 rounded hover:bg-[#0ea5e9]"
              >
                Log In
              </NavLink>

              <NavLink
                to="/register"
                className="hidden md:block bg-[#38bdf8] text-white px-4 py-2 rounded hover:bg-[#0ea5e9]"
              >
                Register
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
          <a href="/" className="block text-white py-2 px-4 hover:bg-[#1e293b]">
            Home
          </a>
          <a
            href="/user-dashboard"
            className="block text-white py-2 px-4 hover:bg-[#1e293b]"
          >
            User
          </a>
          <a
            href="/about"
            className="block text-white py-2 px-4 hover:bg-[#1e293b]"
          >
            About
          </a>
          <a href="#" className="block text-white py-2 px-4 hover:bg-[#1e293b]">
            Register
          </a>
          <a
            href="/register"
            className="block text-white py-2 px-4 hover:bg-[#1e293b]"
          >
            Contact
          </a>
          <button className="w-full text-left bg-[#38bdf8] text-white py-2 px-4 mt-2 hover:bg-[#0ea5e9]">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};
