import { useEffect, useState } from "react";
import { MessageInput } from "./MessageInput";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../../../context/Context";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import { toast } from "react-toastify";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
  FaImage,
} from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { LoadingOverlay } from "../../Loading/Loading";
dayjs.extend(utc);
dayjs.extend(duration);

export const ChatWindow = () => {
  const { selectedChat } = useOutletContext();
  const { chatUser, userId } = selectedChat;

  const [messages, setMessages] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [status, setStatus] = useState("loading"); // loading, before, during, end
  const [remainingTime, setRemainingTime] = useState(null);
  const {
    fetchData,
    apiLoading,
    isLoggedIn,
    onlineStatus,
    setOnlineStatus,
    refreshFlag,
  } = useAuth();
  useEffect(() => {
    if (!chatUser?._id) return; // Early return if chatUser ID is unavailable

    const fetchingData = async () => {
      try {
        // Fetch messages and schedule concurrently
        const [messagesResponse, scheduleResponse, userStatusResoponse] =
          await Promise.all([
            fetchData(`http://localhost:3000/get/${chatUser._id}`),
            fetchData(
              `http://localhost:3000/counseling-schedule/${chatUser._id}`
            ),
            fetchData(`http://localhost:3000/user-status/${chatUser._id}`),
          ]);

        // Handle messages response
        if (userStatusResoponse.success) {
          setOnlineStatus(userStatusResoponse.data || "");
        } else {
          toast.error(
            userStatusResoponse.message || "Failed to fetch userStatus"
          );
        }

        // Handle messages response
        if (messagesResponse.success) {
          setMessages(messagesResponse.data || []);
        } else {
          toast.error(messagesResponse.message || "Failed to fetch messages");
        }

        // Handle schedule response
        if (scheduleResponse.success) {
          setSchedule(scheduleResponse.data || {});
        } else {
          toast.error(scheduleResponse.message || "Failed to fetch schedule");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An unexpected error occurred while fetching data.");
      }
    };

    fetchingData();
  }, [chatUser?._id, isLoggedIn, fetchData, refreshFlag]); // Dependency array

  useEffect(() => {
    const sessionEnd = dayjs.utc(schedule.endDate);
    const sessionStart = dayjs.utc(schedule.startDate);

    const intervalId = setInterval(() => {
      const now = dayjs();

      // Pre-Session Countdown
      if (now.isBefore(sessionStart)) {
        setStatus("before");
        const remaining = dayjs.duration(sessionStart.diff(now));
        setRemainingTime({
          days: remaining.days(),
          hours: remaining.hours(),
          minutes: remaining.minutes(),
          seconds: remaining.seconds(),
        });

        // During Session Countdown
      } else if (now.isAfter(sessionStart) && now.isBefore(sessionEnd)) {
        setStatus("during");
        const remaining = dayjs.duration(now.diff(sessionStart)); // Calculate remaining time

        setRemainingTime({
          days: remaining.days(),
          hours: remaining.hours(),
          minutes: remaining.minutes(),
          seconds: remaining.seconds(),
        });

        // Post-Session
      } else if (now.isAfter(sessionEnd)) {
        setStatus("end");
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [schedule.startDate, schedule.endDate]);
  // if (apiLoading) {
  //   return <LoadingOverlay />;
  // }
  return (
    <>
      {isLoggedIn && chatUser?._id ? (
        <div className="flex flex-col justify-between h-screen">
          <div className="">
            <div className="flex items-center gap-2 py-2 px-4 bg-gray-800">
              {onlineStatus.status === "online" ? (
                <span className="text-green-500">• Online</span> // Green icon for online
              ) : (
                <span className="text-gray-500">• Offline</span> // Gray icon for offline
              )}
              <img
                className="w-12 rounded-full"
                src={`http://localhost:3000/images/${chatUser?.profile}`}
                alt="demy logo"
              />
              <span className="text-white text-xl font-medium capitalize">
                <span className="text-secondary font-bold"> Chat with: </span>
                <span className="text-white font-bold">
                  {chatUser?.personalInfo?.name}
                </span>
                {status === "before" && remainingTime ? (
                  <div style={{ fontSize: "25px" }}>
                    <span>Session Starts In: </span>
                    <span>{remainingTime.days}</span>:
                    <span>{remainingTime.hours}</span>:
                    <span>{remainingTime.minutes}</span>:
                    <span>{remainingTime.seconds}</span>
                  </div>
                ) : status === "during" && remainingTime ? (
                  <div style={{ fontSize: "25px" }}>
                    <span>Remaining Duration: </span>
                    <span>{remainingTime.days}</span>:
                    <span>{remainingTime.hours}</span>:
                    <span>{remainingTime.minutes}</span>:
                    <span>{remainingTime.seconds}</span>
                  </div>
                ) : (
                  status === "end" && (
                    <p className="text-white font-bold">Session End</p>
                  )
                )}
              </span>
            </div>
            <div className="">
              <ul className="overflow-y-scroll h-[30.4rem] bg-gray-800 border-t-2 border-secondary px-4 pt-2">
                {messages?.map((obj) => (
                  <li
                    key={obj._id}
                    className={`mb-4 p-4 w-full max-w-sm rounded-lg shadow-md text-sm font-medium relative ${
                      obj.senderId === userId
                        ? "bg-secondary text-white ml-auto"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {/* Message Content */}
                    <p className="leading-relaxed mb-2">{obj.message}</p>

                    {/* Image Preview */}
                    {obj.image && (
                      <div className="mb-2">
                        <img
                          src={`http://localhost:3000/chat/${obj.image}`} // Adjust the path if needed
                          alt="Attachment"
                          className="rounded-lg border max-w-full"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}

                    {/* File Preview */}
                    {obj.file && (
                      <div className="p-3 mb-2 bg-gray-400 rounded-lg shadow-inner border flex items-center gap-3">
                        {/* File Type Icons */}
                        {obj.file.match(/\.(pdf)$/i) && (
                          <FaFilePdf className="h-6 w-6 text-red-500" />
                        )}
                        {obj.file.match(/\.(docx|doc)$/i) && (
                          <FaFileWord className="h-6 w-6 text-blue-500" />
                        )}
                        {obj.file.match(/\.(xlsx|xls)$/i) && (
                          <FaFileExcel className="h-6 w-6 text-green-500" />
                        )}
                        {obj.file.match(/\.(txt)$/i) && (
                          <FaFileAlt className="h-6 w-6 text-gray-700" />
                        )}
                        {obj.file.match(/\.(jpg|jpeg|png|gif)$/i) && (
                          <FaImage className="h-6 w-6 text-yellow-500" />
                        )}

                        <span className="truncate text-sm font-medium text-gray-700">
                          {obj.file.split("\\").pop()}
                        </span>

                        {/* Download Link */}
                        <a
                          href={`http://localhost:3000/chat/${obj.file}`} // Adjust the path if needed
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto flex items-center text-blue-500 hover:underline"
                        >
                          <IoMdDownload className="mr-1" />
                          Download
                        </a>
                      </div>
                    )}

                    {/* Timestamp */}
                    <span className="text-xs text-gray-500 absolute bottom-1 right-2">
                      {new Date(obj.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <MessageInput
              selectedChat={selectedChat}
              setMessages={setMessages}
              isChatEnabled={status === "during"}
            />
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
            <p className="text-gray-600 mt-4 text-lg">
              We're glad to have you here!
            </p>
          </div>
        </div>
      )}
          
    </>
  );
};
