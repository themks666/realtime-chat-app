import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true,
        minlength: [6, "Password must be at least 6 characters long"]
    },
    profilePic:{
        type: String,
        
    },
}, {timestamps:true})

export const UserModel = mongoose.model("User", userSchema)