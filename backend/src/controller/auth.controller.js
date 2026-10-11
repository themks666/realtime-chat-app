import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../lib/token.js";
import { sendEmail } from "../emails/emailHandlers.js";
import { cloudinary } from "../lib/cloudinary.js";

export const register = async (req, res) => {
  console.log("register");
  const { fullName, email, password } = req.body;
  console.log(req.body);
  
  if (!fullName || !email || !password) {
    return res
    .status(403)
    .json({ success: false, message: "All fields are required!" });
  }
  console.log(req.body);
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  if (!isValidEmail(email)) {
    return res.status(403).json({ success: false, message: "Invalid Email!" });
  }
  console.log(req.body);
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return res.status(403).json({
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
      generateToken(savedUser._id, res);
     // sendEmail(savedUser.email);
      return res
        .status(201)
        .json({ success: true, message: "User Has been Created" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(403)
      .json({ success: false, message: "All fields are required!" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found !" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials !" });
    }
    generateToken(user._id, res);
    const { password: _, ...userWithoutPassword } = user._doc;
    return res.status(200).json({
      success: true,
      message: "Sucessfully logged In",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const logOut = async (req, res) => {
  console.log("Log Out");
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Sucessfully logged Out",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateProfile = async (req, res)=>{
  try {
    const { fullName, profilepic } =req.body
    const id  = req.params.id
    if(!fullName && !profilepic){
      return res
      .status(403)
      .json({ success: false, message: "All fields are required!" });
    }
    let updatedData = {}
    if(fullName){
      updatedData.fullName = fullName
    }
    if(profilepic){
      const imageUpload = await cloudinary.uploader.upload(profilepic)
      updatedData.profilePic = imageUpload.secure_url
    }

    const updatedProfile = await UserModel.findByIdAndUpdate(id, updatedData, {new:true}).select("-password")
    return res.status(200).json({
      success: true,
      message: "Sucessfully Updated the profile",
      user: updatedProfile
    });

  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}