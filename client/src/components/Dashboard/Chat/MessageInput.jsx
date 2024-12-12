import { useState, useMemo, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useAuth } from "../../../context/Context.jsx";
import { LoadingOverlay } from "../../Loading/Loading";
import { toast } from "react-toastify";
import { Send, FileText, Image as ImageIcon } from "lucide-react"; // Importing icons
export const MessageInput = ({ selectedChat, setMessages, isChatEnabled }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        transports: ["websocket"],
        withCredentials: true,
      }),
    []
  );
  const { postData, apiLoading, setOnlineStatus, onlineStatus, isLoggedIn } = useAuth();
  // const { postUserMessage, postData, apiLoading } = useAuth();

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const { chatUser, userId } = selectedChat;
  // const [file, setFile] = useState(null); // To store the selected file (image/PDF)

  // Update the file state when a file is selected
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]); // The first file selected
  // };
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  // Handle file input (PDF, Word, Excel, Text)
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

  // Handle image input (PNG, JPG)
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpeg"];

    if (allowedImageTypes.includes(selectedImage.type)) {
      setImage(selectedImage);
    } else {
      alert("Only PNG and JPG images are allowed.");
    }
  };
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height
    const maxHeight = parseInt(getComputedStyle(textarea).lineHeight) * 5; // Calculate maxHeight for 5 rows
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`; // Adjust to content but not beyond 5 rows
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
      const newMessage = { room, message, sender: userId };
      socket.emit("message", newMessage); // Send message to room
      try {
        const responseData = await postData(
          `http://localhost:3000/send/${chatUser?._id}`,
          {
            message,
          }
        );
        if (responseData.success) {
          // Reset the textarea value and height
          setMessage(""); // Clear the message state
          const textarea = textareaRef.current;
          textarea.style.height = "auto"; // Reset height to default
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error("An unexpected error occurred while post message");
      }
    }
  };
  // if (apiLoading) {
  //   return apiLoading && <LoadingOverlay />;
  // }
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
        setOnlineStatus({status:"online"});
      } 
      else if (data.status === "offline") {  
        setOnlineStatus({status:"offline"});
      }
    });
    return () => {
      socket.off("connect");
      socket.off("message");
      socket.off("status");
    }; 
  }, [socket, chatUser?._id, userId]);

  return (
    <div className="flex items-center bg-primary p-4 shadow-md border border-secondary rounded-lg">
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
          <div className="relative flex-grow">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                handleInputChange(e);
                handleInput(e);
              }}
              placeholder="Type a message..."
              rows={1}
              className="w-full p-3 border rounded-lg bg-gray-900 text-white text-base font-medium leading-relaxed focus:outline-none resize-none overflow-y-auto" // overflow-y-auto ensures scrollbar appears
              style={{ lineHeight: "1.5rem", maxHeight: "7.5rem" }} // Adjust lineHeight and maxHeight accordingly (1.5rem * 5 rows)
            ></textarea>

            {/* Icons Positioned Inside the Input */}
            <div className="absolute bottom-2 right-3 flex space-x-3">
              {/* File Upload */}
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                className="hidden"
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <FileText
                  className="text-white hover:text-blue-500"
                  size={24}
                />
              </label>

              {/* Image Upload */}
              <input
                type="file"
                id="imageInput"
                onChange={handleImageChange}
                accept=".png,.jpg,.jpeg"
                className="hidden"
              />
              <label htmlFor="imageInput" className="cursor-pointer">
                <ImageIcon
                  className="text-white hover:text-blue-500"
                  size={24}
                />
              </label>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="ml-3 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 text-primary bg-secondary hover:text-white font-bold text-xl duration-300 hover:scale-110"
          >
            Send
          </button>
        </>
      )}
    </div>
  );
};
