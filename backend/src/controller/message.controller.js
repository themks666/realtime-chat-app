import { UserModel } from "../models/user.model.js";
import { MessageModel } from "../models/messages.model.js";
import { cloudinary } from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
  const loggedUser = req.user._id;
  try {
    const filterUsers = await UserModel.find({
      _id: { $ne: loggedUser },
    }).select("-password");
    if (!filterUsers) {
      return res
        .status(404)
        .json({ success: false, message: "No user found at the moment " });
    }
    res.status(200).json({ success: true, users: filterUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const getAllMessagesById = async (req, res) => {
  const receiverId = req.params.id;
  const senderId = req.user._id;
  try {
    const messages = await MessageModel.find({
      $or: [
        { receiverId, senderId },
        { receiverId: senderId, senderId: receiverId },
      ],
    });
    if (!messages) {
      return res
        .status(404)
        .json({ success: false, message: "No Message Found" });
    }
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log("error in getting messages : \n", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  const receiverId = req.params.id;
  const senderId = req.user._id;
  const { text, image } = req.body;
  if (!text && !image) {
    return res
      .status(403)
      .json({ success: false, message: "No text/image was provided" });
  }
  let imageUrl;
  if (image) {
    const uploadImage = cloudinary.uploader.upload(image);
    imageUrl = (await uploadImage).secure_url;
  }
  try {
    const message = await MessageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await message.save();
    res.status(201).json({ success: true, message });
  } catch (error) {
    console.log("error in getting messages : \n", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  console.log("get all contacts");
  const userId = req.user._id;

  try {
    const message = await MessageModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });
    const chatPartnersId = [
      ...new Set(
        message.map((msg) =>
          msg.senderId.toString() == userId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString,
        ),
      ),
    ];
    const chatPartners = await UserModel.find({
      _id: { $in: chatPartnersId },
    }).select("-password");
    res.status(201).json({ success: true, chatPartners });
  } catch (error) {
    console.log("error in getting messages : \n", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
