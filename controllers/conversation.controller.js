import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import {
  CreateConversation,
  doesConversationExists,
  populateConversation,
} from "../services/conversation.service.js";
import asyncHandler from "express-async-handler";
import { findUser } from "../services/user.service.js";

export const create_open_conversation = asyncHandler(async (req, res) => {
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
  if (existed_conversation === null) {
    res.json(existed_conversation);
  } else {
    let receiver_user = await findUser(receiver_id);
    let convoData = {
      name: receiver_user.name,
      isGroup: false,
      users: [sender_id, receiver_id],
    };
    console.log("---------------------------------------" + convoData);
    const newConvo = await CreateConversation(convoData);
    const populatedConvo = await populateConversation(
      newConvo._id,
      "users",
      "-password"
    );
    res.status(200).json(populatedConvo);
  }
});
