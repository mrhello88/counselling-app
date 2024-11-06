import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          {/* Left side: Website name and navigation links */}
          <div>
            <h2 className="text-secondary text-2xl font-bold">
              Your Website Name
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-secondary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-secondary">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-secondary">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Right side: Footer links like Terms and Privacy */}
          <div className="text-sm md:text-base flex flex-col md:flex-row md:space-x-6">
            <Link to="#" className="hover:text-secondary">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-secondary">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Bottom area */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};
