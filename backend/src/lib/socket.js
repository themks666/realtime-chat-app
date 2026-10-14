import { Server } from "socket.io";
import express from "express";
import http from "http";
import { socketAuthMiddleware } from "../middleware/socket.middleware.js";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
io.use(socketAuthMiddleware);

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected ", socket?.user?.fullName);
  const userId = socket.userId;
  userSocketMap[userId] = socket.id;
  console.log(Object.keys(userSocketMap));

  io.emit("get_online_users", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("User disconnected",socket.user.fullName);
    delete userSocketMap[userId];
  });
});
export { io, app, server };
