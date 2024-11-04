import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { searchUsers as searchUsersService } from "../services/user.service.js";
import asyncHandler from "express-async-handler";
export const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    logger.error("Please provide a keyword");
    throw createHttpError.BadRequest("Please provide a keyword");
  }
  const users = await searchUsersService(keyword);
  res.status(200).json(users);
});
