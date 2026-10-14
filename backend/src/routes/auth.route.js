import express from "express";
import { login, logOut, register, updateProfile } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/verifyProfile.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router()
router.use(arcjetProtection)
router.post("/register", register)
router.post("/login", login)
router.get("/logout", logOut)
router.post("/update-profile",protectedRoute, updateProfile)
router.get("/verify",protectedRoute, (req, res)=>{ res.status(200).json({user:req.user})})

export default router