import React, { useState, useEffect } from "react";
import { SideBar } from "../components/Dashboard/SideBar/Side-Bar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar";

export const UserDashboard = () => {
  const [selectedChat, setSelectedChat] = useState({});
  const handleSelectChat = (chatUser, userId) => {
    setSelectedChat({ chatUser, userId });
  };

  return (
    <>
      <section className="">
        <div className="flex justify-around container h-full">
          <div className="w-1/4">
            <SideBar onSelectChat={handleSelectChat} />
          </div>
          <div className="w-3/4">
            <Navbar />
            <Outlet context={{ selectedChat }} />
          </div>
        </div>
      </section>
    </>
  );
};
