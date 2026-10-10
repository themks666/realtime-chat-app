import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../lib/token.js";

export const register = async (req, res) => {
  console.log("register");
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(403)
      .json({ success: false, message: "All fields are required!" });
  }
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  if (!isValidEmail(email)) {
    return res.status(403).json({ success: false, message: "Invalid Email!" });
  }
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return res
        .status(403)
        .json({
          success: false,
          message: "Email Already exist, try another email or login!",
        });
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });
    if (createdUser) {
      const savedUser = await createdUser.save();
      generateToken(savedUser._id, res)
      return res
        .status(201)
        .json({ success: true, message: "User Has been Created" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  console.log("Login");
};
export const logOut = async (req, res) => {
  console.log("Log Out");
};
