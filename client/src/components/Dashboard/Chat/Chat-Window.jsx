import { MessageInput } from "./MessageInput";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { RxAvatar } from "react-icons/rx";
import Navbar from "../Navbar";

export const ChatWindow = () => {
  const { selectedChat } = useOutletContext();
  const { chatUser, userId } = selectedChat;

  // const { chat } = user;
  // console.log(chat, "chats");

  const [messages, setMessages] = useState([]);
  const { getUserMessages } = useAuth(); // Assume this function fetches messages from the server.
  const [isLoading, setIsLoading] = useState(false); // Add loading state to prevent multiple fetches.

  // Fetch chat history when the chat user changes
  useEffect(() => {
    if (chatUser?._id) {
      const fetchMessages = async () => {
        const fetchedMessages = await getUserMessages(chatUser._id);
        setMessages(fetchedMessages || []); // Set fetched messages locally
      };
      fetchMessages();
    }
  }, [chatUser?._id, getUserMessages]);

  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      <div className="h-full">
        <div className="flex items-center gap-2 py-2 px-4">
          <img
            className="w-12 rounded-full"
            src="/src/assets/reactIcon.png"
            alt="demy logo"
          />
          <span className="text-black text-xl font-medium capitalize">
            Chat with: {chatUser?.personalInfo?.name}
          </span>
        </div>
        <div className="">
          <ul className="overflow-y-scroll h-[497px] bg-white border border-gray-300 px-4 pt-2">
            {messages?.map((obj) => (
              <li
                key={obj._id}
                className={`mb-2 p-2 max-w-xs rounded-lg ${
                  obj.senderId === userId
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                <p>{obj.message}</p>
              </li>
            ))}
          </ul>
        </div>
        <MessageInput selectedChat={selectedChat} setMessages={setMessages} />
      </div>
    </div>
  );
};
