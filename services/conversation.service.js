import createHttpError from "http-errors";
import { UserModel, ConversationModel } from "../models/index.js";

import asyncHandler from "express-async-handler";
export const doesConversationExists = asyncHandler(
  async (sender_id, receiver_id) => {
    let convos = await ConversationModel.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: sender_id } } },
        { users: { $elemMatch: { $eq: receiver_id } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    if (!convos) {
      throw createHttpError.BadRequest("Oops...something went wrong !");
    }
    convos = await UserModel.populate(convos, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });
    return convos;
  }
);
export const CreateConversation = asyncHandler(async (data) => {
  const newConvo = await ConversationModel.create(data);
  if (!newConvo) {
    throw createHttpError.BadRequest("Oops...something went wrong !");
  }
  return newConvo;
});
export const populateConversation = asyncHandler(
  async (id, fieldToPopulate, fieldsToRemove) => {
    const populateConvo = await ConversationModel.findById(id).populate(
      fieldToPopulate,
      fieldsToRemove
    );
    if (!populateConvo) {
      throw createHttpError.BadRequest("Oops...something went wrong !");
    }
    return populateConvo;
  }
);
