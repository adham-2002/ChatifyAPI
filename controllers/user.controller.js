import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { searchUsers as searchUsersService } from "../services/user.service.js";
import { findUser } from "../services/user.service.js";
import asyncHandler from "express-async-handler";
//! Search for user
export const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    logger.error("Please provide a keyword");
    throw createHttpError.BadRequest("Please provide a keyword");
  }
  const users = await searchUsersService(keyword, req.user._id);
  res.status(200).json(users);
});
//! get logged in user
export const getLoggedInUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await findUser(userId);
  if (!user) {
    throw createHttpError.NotFound("User not found");
  }
  res.status(200).json(user);
});
