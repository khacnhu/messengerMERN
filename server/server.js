const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const authRoutes = require("./routes/auth");
// const mongoose = require("mongoose");
const messageRoutes = require("./routes/message");
const db = require("../server/configdata");
// const { Socket } = require("socket.io");
const socket = require("socket.io");
db.connect();



app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING..${PORT}..`)
})
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });


