import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import trimRequest from "trim-request";
const router = express.Router();

router.use(authMiddleware);
router.use(trimRequest.all);
router.route("/").post(sendMessage);
router.route("/:convo_id").get(getMessages);

export default router;
