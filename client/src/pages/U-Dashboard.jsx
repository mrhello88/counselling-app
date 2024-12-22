import React, { useState, useEffect } from "react";
import { SideBar } from "../components/Dashboard/SideBar/Side-Bar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar";

export const UserDashboard = () => {
  const [selectedChat, setSelectedChat] = useState({});
  const handleSelectChat = (chatUser, userId) => {
    setSelectedChat({ chatUser, userId });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <section className="">
        <div className="flex">
          <div
            className={`fixed top-0 left-0 bg-black h-screen z-20 transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:static md:w-1/4 md:h-auto md:translate-x-0`} // Adjust for larger screens
          >
            <SideBar
              onSelectChat={handleSelectChat}
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </div>
          <div className="md:w-3/4 w-full">
            <Navbar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
            <Outlet context={{ selectedChat }} />
          </div>
        </div>
      </section>
    </>
  );
};
