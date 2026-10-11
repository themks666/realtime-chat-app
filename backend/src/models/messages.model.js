import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  text: {
    type: String,
    maxLenght:2000
  },
  image: {
    type: String,
  },
}, { timestamps: true});

export const MessageModel = mongoose.model("Message",messageSchema)