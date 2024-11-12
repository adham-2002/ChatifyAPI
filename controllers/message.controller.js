import asyncHandler from "express-async-handler";
import logger from "../configs/logger.config.js";
import { updateLatestMessage } from "../services/conversation.service.js";
import {
  createMessage,
  getConvoMessages,
  populateMessages,
} from "../services/message.service.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const { message, convo_id, files } = req.body;
  if (!convo_id) {
    logger.error("Please provide the conversation id");
    return res.sendStatus(400);
  }

  if (!message && (!files || files.length === 0)) {
    logger.error("Please provide either a message or a file");
    return res.sendStatus(400);
  }
  const msgData = {
    sender: user_id,
    message,
    conversation: convo_id,
    files: files || [],
  };
  let newMessage = await createMessage(msgData);
  let populatedMessage = await populateMessages(newMessage._id);
  await updateLatestMessage(convo_id, newMessage);
  res.json(populatedMessage);
});
export const getMessages = asyncHandler(async (req, res) => {
  const convo_id = req.params.convo_id;
  if (!convo_id) {
    logger.error("Please provide the conversation id");
    return res.sendStatus(400);
  }
  const messages = await getConvoMessages(convo_id);
  res.json(messages);
});
