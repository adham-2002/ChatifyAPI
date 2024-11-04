import express from "express";
import authRoutes from "./auth.route.js";
import ConversationRoutes from "./conversation.route.js";
import messageRoutes from "./message.route.js";
import userRoutes from "./user.route.js";
const router = express.Router();
// auth routes => login, register, logout, refreshToken
router.use("/auth", authRoutes);
// conversation routes
router.use("/conversation", ConversationRoutes);
router.use("/message", messageRoutes);
router.use("/user", userRoutes);
export default router;
