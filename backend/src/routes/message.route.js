import express from "express"
import { getAllContacts, getAllMessagesById, getChatPartners, sendMessage } from "../controller/message.controller.js"
import { protectedRoute } from "../middleware/verifyProfile.js"
import { arcjetProtection } from "../middleware/arcjet.middleware.js"
const router  = express.Router()
router.use(arcjetProtection)
router.use(protectedRoute)
router.get("/contacts", getAllContacts)
router.get("/chats", getChatPartners)
router.get("/:id", getAllMessagesById)
router.post("/send/:id", sendMessage)

export default router