import React, { useState } from "react";
import { SideBar } from "../components/Dashboard/SideBar/Side-Bar";
import { Outlet } from "react-router-dom";
export const CounsellorDashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };
 const chats=[
    { id: 1, name: "John" },
    { id: 2, name: "aDsdfsoe" },
    { id: 3, name: "aDoesdf" },
    { id: 4, name: "aDoasde" },
    { id: 5, name: "adsfDoe" },
  ]

  return (
    <>
      <section className="max-h-screen h-screen">
        <div className="flex justify-around container h-full bg-red-400">
          <div className="w-1/4 h-full">
            <SideBar
              onSelectChat={handleSelectChat}
              UC={"Student'S"}
              chatings={chats}
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
