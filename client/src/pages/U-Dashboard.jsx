import React, { useState, useEffect } from "react";
import { SideBar } from "../components/Dashboard/SideBar/Side-Bar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar";
import { Footer } from "../components/Navbar-Footer/Footer";

export const UserDashboard = () => {
  const [selectedChat, setSelectedChat] = useState({});
  const handleSelectChat = (chatUser, userId) => {
    setSelectedChat({ chatUser, userId });
  };

  return (
    <>
      <section>
        <div className="flex">
          <div className="w-1/4">
            <SideBar onSelectChat={handleSelectChat} />
          </div>
          <div className="flex flex-col w-3/4">
            <Navbar />
            <div className="h-0">
              <Outlet context={{ selectedChat }} />
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};
