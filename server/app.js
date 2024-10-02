const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
let PORT = process.env.PORT || 3000
// const authentication = require("./middleware/authentication").authentication
const counselorRoute = require("./router/counselor")
const authRoute = require("./router/auth")
const messageRoute = require("./router/message")

const { Server } = require("socket.io");
const server = http.createServer(app);
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "UPDATE"],
  Credentials: true,
};
// app.use(authentication)
app.use(cors(corsOptions));
app.use(express.json())
const io = new Server(server);

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(req.params.userId)
  res.send("<h1>Hello world</h1>");
});
app.use(counselorRoute)
app.use(authRoute)
app.use(messageRoute)
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Handle joining the room
  socket.on('join', ({ room }) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle receiving and broadcasting messages
  socket.on('message', ({ room, message, sender }) => {
    const newMessage = { message, senderId:sender, _id: Date.now() };
    // Broadcast the message to everyone in the room
    io.to(room).emit('message', newMessage);

    // Optionally, save the message to the database
    // Save message to MongoDB

  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
 
console.log("paksitan");
mongoose
  .connect(
    process.env.MONGODB_STRING
  )
  .then(() => {
    server.listen(PORT);
  });
