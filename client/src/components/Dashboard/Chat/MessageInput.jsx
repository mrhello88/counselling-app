import { useState, useMemo, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useAuth } from "../../../context/Context.jsx";
import { toast } from "react-toastify";
import { Send, FileText, Image as ImageIcon, Trash2 } from "lucide-react"; // Importing icons

export const MessageInput = ({ selectedChat, setMessages, isChatEnabled }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        transports: ["websocket"],
        withCredentials: true,
      }),
    []
  );

  const { postData, apiLoading, setOnlineStatus, setRefreshFlag } = useAuth();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const textareaRef = useRef(null);

  const { chatUser, userId } = selectedChat;

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedFileTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ];

    if (allowedFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Only PDF, Word, Excel, and text files are allowed.");
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpeg"];

    if (allowedImageTypes.includes(selectedImage.type)) {
      setImage(selectedImage);
    } else {
      alert("Only PNG and JPG images are allowed.");
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height
    const maxHeight = parseInt(getComputedStyle(textarea).lineHeight) * 5; // Calculate maxHeight for 5 rows
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };

  const handleSend = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (!message.trim() && !file && !image) {
      toast.error("Cannot send an empty message or file!");
      return;
    }

    const room = [userId, chatUser?._id].sort().join("-");
    const createdAt = new Date().toISOString(); // Current timestamp

    const formData = new FormData();
    formData.append("message", message.trim());
    formData.append("createdAt", createdAt); // Append the createdAt timestamp
    if (file) {
      formData.append("chatFile", file);
    }
    if (image) {
      formData.append("chatImage", image);
    }
    try {
      const responseData = await postData(
        `http://localhost:3000/send/${chatUser?._id}`,
        formData
      );
      if (responseData.success) {
        responseData.data;
        setRefreshFlag(true);
        const newMessage = {
          room,
          data: responseData.data,
        };
        socket.emit("message", newMessage); // Send message to room
        setMessage("");
        setFile(null);
        setImage(null);
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while posting the message");
    }
  };

  useEffect(() => {
    if (chatUser?._id) {
      const room = [userId, chatUser?._id].sort().join("-");
      socket.emit("join", { room, userId }); // Join room when chat is selected
    }

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("status", (data) => {
      // Check if the status is 'online' and set the status of the other user
      console.log(data.status, data.socketId, socket.id, "this is id's");
      if (data.status === "online") {
        setOnlineStatus({ status: "online" });
      } else if (data.status === "offline") {
        setOnlineStatus({ status: "offline" });
      }
    });
    return () => {
      socket.off("connect");
      socket.off("message");
      socket.off("status");
    };
  }, [socket, chatUser?._id, userId]);

  const removeAttachment = (type) => {
    if (type === "file") setFile(null);
    if (type === "image") setImage(null);
  };

  return (
    <div className="flex flex-col bg-primary p-4 shadow-md border border-secondary rounded-lg space-y-4">
      {(message || image || file) && (
        <div className="bg-gray-800 p-3 rounded-lg space-y-4 max-h-64 overflow-y-auto">
          {image && (
            <div className="relative border border-gray-700 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <button
                onClick={() => removeAttachment("image")}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full focus:outline-none hover:bg-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
          {file && (
            <div className="flex items-center justify-between p-2 bg-gray-700 rounded-lg border border-gray-600">
              <p className="text-white truncate max-w-[75%]">{file.name}</p>
              <button
                onClick={() => removeAttachment("file")}
                className="text-red-600 hover:text-red-400 focus:outline-none"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
          {message.trim() && (
            <p className="text-white bg-gray-700 p-2 rounded-lg border border-gray-600 break-words max-h-40 overflow-hidden">
              {message}
            </p>
          )}
        </div>
      )}
      {/* Input Section */}
      <div className="flex items-center space-x-3">
        {isChatEnabled ? (
          <>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                handleInputChange(e);
                handleInput();
              }}
              placeholder="Type a message..."
              rows={1}
              className="flex-grow w-full p-3 border rounded-lg bg-gray-900 text-white text-base font-medium focus:outline-none resize-none overflow-y-auto"
            ></textarea>
            <div className="flex space-x-2">
              <label htmlFor="fileInput" className="cursor-pointer">
                <FileText
                  className="text-white hover:text-blue-500"
                  size={24}
                />
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                className="hidden"
              />
              <label htmlFor="imageInput" className="cursor-pointer">
                <ImageIcon
                  className="text-white hover:text-blue-500"
                  size={24}
                />
              </label>
              <input
                type="file"
                id="imageInput"
                onChange={handleImageChange}
                accept=".png,.jpg,.jpeg"
                className="hidden"
              />
            </div>
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded-lg text-primary bg-secondary hover:text-white font-bold duration-300 hover:scale-105"
            >
              Send
            </button>
          </>
        ) : (
          <>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                handleInputChange(e);
                handleInput();
              }}
              disabled
              placeholder="Type a message..."
              rows={1}
              className="flex-grow w-full p-3 border rounded-lg bg-gray-900 text-white text-base font-medium focus:outline-none resize-none overflow-y-auto"
            ></textarea>
            <div className="flex space-x-2">
              <label htmlFor="fileInput" className="cursor-pointer">
                <FileText
                  className="text-white hover:text-blue-500"
                  size={24}
                />
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                disabled
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                className="hidden"
              />
              <label htmlFor="imageInput" className="cursor-pointer">
                <ImageIcon
                  className="text-white hover:text-blue-500"
                  size={24}
                />
              </label>
              <input
                type="file"
                id="imageInput"
                onChange={handleImageChange}
                disabled
                accept=".png,.jpg,.jpeg"
                className="hidden"
              />
            </div>
            <button
              onClick={handleSend}
              disabled
              className="px-4 py-2 rounded-lg text-primary bg-secondary hover:text-white font-bold duration-300 hover:scale-105"
            >
              Send
            </button>
          </>
        )}
      </div>
    </div>
  );
};
