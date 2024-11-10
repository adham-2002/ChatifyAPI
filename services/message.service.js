import createHttpError from "http-errors";
import { MessageModel, UserModel } from "../models/index.js";

import asyncHandler from "express-async-handler";
export const createMessage = asyncHandler(async (data) => {
  let newMessage = await MessageModel.create(data);
  if (!newMessage) {
    throw createHttpError.BadRequest("Oops...something went wrong !");
  }
  return newMessage;
});
export const populateMessages = asyncHandler(async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name  picture isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });

  if (!msg) {
    throw createHttpError.BadRequest("Oops...something went wrong !");
  }
  return msg;
});
export const getConvoMessages = asyncHandler(async (convo_id) => {
  const message = await MessageModel.find({ conversation: convo_id })
    .populate("sender", "name email picture status")
    .populate("conversation");
  if (!message) {
    throw createHttpError.BadRequest("Oops...something went wrong !");
  }
  return message;
});
