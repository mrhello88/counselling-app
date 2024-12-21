const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
let PORT = process.env.PORT || 3000;
const path = require("path");
let client = require("./utils/redisDatabase");
// const authentication = require("./middleware/authentication").authentication
const counselorRoute = require("./router/counselor");
const authRoute = require("./router/auth");
const messageRoute = require("./router/message");
const profileRoute = require("./router/profile");
const userStatusRoute = require("./router/userStatus");
const counselorProfileRoute = require("./router/counselingSession");
const adminRoute = require("./router/admin");
const studentRoute = require("./router/student");
const error = require("./controller/error404");
const { Server } = require("socket.io");
const server = http.createServer(app);
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "UPDATE"],
  Credentials: true,
};

// app.use(authentication)
app.use(cors(corsOptions));
app.use(express.json());
const io = new Server(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(profileRoute);
app.use(counselorRoute);
app.use(authRoute);
app.use(messageRoute);
app.use(userStatusRoute);
app.use(adminRoute);
app.use(counselorProfileRoute);
app.use(studentRoute);
app.use(error.error404);
try {
  io.on("connection", async (socket) => {
    console.log("A user connected", socket.id);
    // Handle joining the room
    socket.on("join", async ({ room, userId }) => {
      // Leave the previous room if the user was already in one
      if (socket.room) {
        socket.leave(socket.room);
        // Notify the old room that the user is offline
        await client.set(
          [userId],
          JSON.stringify({ status: "offline" }, { EX: 3600 })
        );
        socket
          .to(socket.room)
          .emit("status", { socketId: socket.id, status: "offline" });
      }

      // Join the new room
      socket.join(room);
      await client.set(
        [userId],
        JSON.stringify({ status: "online" }, { EX: 3600 })
      );
      socket.room = room; // Store the current room in the socket object
      socket.userId = userId; // Save the user ID for status tracking
      // Notify the new room that the user is online
      socket.to(room).emit("status", { socketId: socket.id, status: "online" });
    });
    // Handle receiving and broadcasting messages
    socket.on("message", ({ room, data }) => {
      const { _id, message, senderId, file, image, createdAt } = data;
      const newMessage = {
        _id,
        message,
        senderId,
        file,
        image,
        createdAt,
      };
      // Broadcast the message to everyone in the room
      io.to(room).emit("message", newMessage);

      // Optionally, save the message to the database
      // Save message to MongoDB
    });

    // Handle disconnect
    socket.on("disconnect", async () => {
      console.log("user disconnect", socket.id);

      if (socket.room) {
        // Notify the room that the user is offline
        await client.set(
          [socket.userId],
          JSON.stringify({ status: "offline" }, { EX: 3600 })
        );
        io.to(socket.room).emit("status", {
          socketId: socket.id,
          status: "offline",
        });
      }
    });
  });
} catch (error) {
  console.error("Error on websockets or redis", error.message);
}

mongoose.connect(process.env.MONGODB_STRING).then(() => {
  server.listen(PORT);
});
