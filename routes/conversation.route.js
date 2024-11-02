import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { create_open_conversation } from "../controllers/conversation.controller.js";
const router = express.Router();
router.route("/").post(authMiddleware, create_open_conversation);
export default router;
