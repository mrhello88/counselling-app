import { MessageInput } from "./MessageInput";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import moment from "moment";

export const ChatWindow = () => {
  const { selectedChat } = useOutletContext();
  const { chatUser, userId } = selectedChat;

  const [messages, setMessages] = useState([]);
  // const [schedule, setSchedule] = useState({});
  const [isChatEnabled, setIsChatEnabled] = useState(false);
  const { getUserMessages, getCounselingSession, isLoggedIn } = useAuth(); // Assume this function fetches messages from the server.

  // Fetch chat history when the chat user changes
  useEffect(() => {
    if (chatUser?._id) {
      const fetchData = async () => {
        const fetchedMessages = await getUserMessages(chatUser._id);
        const fetchSchedule = await getCounselingSession(chatUser._id);
        const now = moment();
        const sessionStart = moment(fetchSchedule.startDate);
        const sessionEnd = moment(fetchSchedule.endDate);
        // Enable chat if the current time is within the session time
        if (now.isBetween(sessionStart, sessionEnd)) {
          setIsChatEnabled(true);
        } else {
          setIsChatEnabled(false);
        }
        setMessages(fetchedMessages || []); // Set fetched messages locally
        // setSchedule(fetchSchedule || {}); 
      };
      fetchData();
    }
  }, [chatUser?._id, isLoggedIn, getUserMessages, getCounselingSession, isChatEnabled]);

  return (
    <>
      {isLoggedIn && chatUser?._id ? (
        <>
          <div className="flex flex-col justify-between h-screen">
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
              <MessageInput
                selectedChat={selectedChat}
                setMessages={setMessages}
                isChatEnabled={isChatEnabled}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
              <p className="text-gray-600 mt-4 text-lg">
                We're glad to have you here!
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
