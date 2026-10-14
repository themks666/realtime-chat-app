import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token =socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
      console.log(socket.handshake.headers);
      
    if (!token) {
      console.log("socket connection rejected: No Token Provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded){
        console.log("Socket connection rejected: Invalid token");
        return next(new Error("Unauthorized - invalid token"))
        
    }
    const user  = await UserModel.findById(decoded.userId).select("-password")
    if(!user){
        console.log("Socket connection rejected: ");
        return next(new Error("User not found"))   
    }
    socket.user = user
    socket.userId = user._id.toString()
    next()
  } catch (error) {
        console.log("Error in socket middleware");
            return next(new Error("Unauthorized - invalid token"))
  }
};
