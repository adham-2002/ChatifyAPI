import createHttpError from "http-errors";
import UserModel from "../models/userModel.js";
export const findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createHttpError.NotFound("User not found");
  }
  return user;
};
export const searchUsers = async (keyword) => {
  const users = await UserModel.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } }, //uppercase and lowercase
      { email: { $regex: keyword, $options: "i" } },
    ],
  });
  return users;
};
