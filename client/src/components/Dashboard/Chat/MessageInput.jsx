import { useState, useMemo, useEffect } from "react";
import io from "socket.io-client";
import { useAuth } from "../../../store/auth";

export const MessageInput = ({ selectedChat, setMessages, isChatEnabled }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        transports: ["websocket"],
        withCredentials: true,
      }),
    []
  );
  const { postUserMessage } = useAuth();

  const [message, setMessage] = useState("");
  const { chatUser, userId } = selectedChat;
  // const [file, setFile] = useState(null); // To store the selected file (image/PDF)

  // Update the file state when a file is selected
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]); // The first file selected
  // };
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (message.trim()) {
      // console.log("file", file)
      // // Create a new FormData instance
      // const formData = new FormData();

      // // Append message and file to the FormData object
      // formData.append("message", message); // Add the message as a field
      // if (file) {
      //   formData.append("file", file); // Add the file if one is selected
      // }
      const room = [userId, chatUser?._id].sort().join("-");
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value, "form data hai");
      // }
      const newMessage = { room, message, sender: userId };
      socket.emit("message", newMessage); // Send message to room

      await postUserMessage(chatUser?._id, message); // Save the message to the server

      setMessage(""); // Clear input
    }
  };

  useEffect(() => {
    if (chatUser?._id) {
      const room = [userId, chatUser?._id].sort().join("-");
      socket.emit("join", { room }); // Join room when chat is selected
    }

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
      socket.off("join");
    };
  }, [socket, chatUser?._id]);

  return (
    <div className="flex items-center space-x-4 bg-primary p-4 shadow-md border- border-secondary">
      {isChatEnabled ? (
        <>
          {" "}
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-grow p-2 border focus:outline-none focus:ring-2 bg-gray-900"
          />
          {/* <input type="file" onChange={handleFileChange} /> */}
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-secondary hover:text-white rounded-lg font-bold text-lg focus:outline-none focus:ring-2 hover:scale-105 duration-50"
          >
            Send
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={message}
            disabled
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-grow p-2 placeholder:text-white font-bold text-sm border border-gray-300 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <input type="file" onChange={handleFileChange} /> */}
          <button
            onClick={handleSend}
            disabled
            className="px-4 py-2 rounded-lg  focus:outline-none focus:ring-2 text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
          >
            Send
          </button>
        </>
      )}
    </div>
  );
};
