import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import {
  CreateConversation,
  doesConversationExists,
  populateConversation,
  getUserConversations,
} from "../services/conversation.service.js";
import asyncHandler from "express-async-handler";
import { findUser } from "../services/user.service.js";

export const create_open_conversation = asyncHandler(async (req, res) => {
  //! 1) find the sender and receiver users
  const sender_id = req.user._id;
  const { receiver_id } = req.body;
  if (!receiver_id) {
    logger.error(
      "Please provide the user id you wanna start a conversation with!"
    );
    throw createHttpError.BadGateway("Oops...something went wrong!");
  }
  // check if chat exists
  const existed_conversation = await doesConversationExists(
    sender_id,
    receiver_id
  );

  if (existed_conversation.length > 0) {
    logger.info("Chat already exists");
    res.json(existed_conversation);
  } else {
    let receiver_user = await findUser(receiver_id);
    let convoData = {
      name: receiver_user.name,
      picture: receiver_user.picture,
      isGroup: false,
      users: [sender_id, receiver_id],
    };
    const newConvo = await CreateConversation(convoData); // return the created conversation
    const populatedConvo = await populateConversation(
      newConvo._id,
      "users",
      "-password"
    );
    res.status(200).json(populatedConvo); // return users data
  }
});
export const getConversations = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const conversations = await getUserConversations(user_id);
  res.status(200).json(conversations);
});
