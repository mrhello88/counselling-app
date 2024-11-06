import { useEffect, useState } from "react";
import { MessageInput } from "./MessageInput";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(duration);

export const ChatWindow = () => {
  const { selectedChat } = useOutletContext();
  const { chatUser, userId } = selectedChat;

  const [messages, setMessages] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [status, setStatus] = useState("loading"); // loading, before, during, end
  const [remainingTime, setRemainingTime] = useState(null);
  const { getUserMessages, getCounselingSession, isLoggedIn } = useAuth();
  useEffect(() => {
    if (chatUser?._id) {
      const fetchData = async () => {
        const fetchedMessages = await getUserMessages(chatUser._id);
        const fetchSchedule = await getCounselingSession(chatUser._id);
        setMessages(fetchedMessages || []);
        setSchedule(fetchSchedule || {});
      };
      fetchData();
    }
  }, [chatUser?._id, isLoggedIn, getUserMessages]);

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

  return (
    <>
      {isLoggedIn && chatUser?._id ? (
        <div className="flex flex-col justify-between h-screen">
          <div className="">
            <div className="flex items-center gap-2 py-2 px-4 bg-gray-800">
              <img
                className="w-12 rounded-full"
                src="/src/assets/reactIcon.png"
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
