import React, { useState, useEffect } from "react";
import { SideBar } from "../components/Dashboard/SideBar/Side-Bar";
import { Outlet } from "react-router-dom";

export const UserDashboard = () => {
  const [selectedChat, setSelectedChat] = useState({});
  const handleSelectChat = (chatUser, userId) => {
    setSelectedChat({chatUser, userId});
  };

  return (
    <>
      <section className="max-h-screen h-screen">
        <div className="flex justify-around container h-full bg-red-400">
          <div className="w-1/4 h-full">
            <SideBar
              onSelectChat={handleSelectChat}
            />
          </div>
          <div className="w-3/4 h-full">
            <Outlet context={{ selectedChat }} />
          </div>
        </div>
      </section>
    </>
  );
};
