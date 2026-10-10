import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized | No Token Provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized | Invalid Token",
      });
    }
    const user = await UserModel.findById(decoded.userId).select("-password")
    if(!user){
        return res
      .status(403)
      .json({ success: false, message: "Invalid Credentials ! " });
    }
    req.user = user
    next()
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
