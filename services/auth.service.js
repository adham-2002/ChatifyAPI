import validator from "validator";
import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;
import bcrypt from "bcrypt";
export const createUser = asyncHandler(
  async (name, email, picture, status, password) => {
    // check if fields are empty ?
    if (!name || !email || !password) {
      throw createHttpError.BadRequest("Please fill all fields");
    }
    //check name Length ?
    if (!validator.isLength(name, { min: 3, max: 16 })) {
      throw createHttpError.BadRequest(
        "Name must be between 3 and 16 characters"
      );
    }
    //check status Length
    if (status && status.length > 64) {
      createHttpError.BadRequest("Status must be less than 64 characters");
    }
    //check if email address is valid
    if (!validator.isEmail(email)) {
      throw createHttpError.BadRequest("Please enter a valid email address");
    }
    // check if user already exists ?
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      throw createHttpError.Conflict(`Please try again with a different email`);
    }
    if (!validator.isLength(password, { min: 8, max: 128 })) {
      throw createHttpError.BadRequest(
        "Password must be between 8 and 128 characters"
      );
    }
    // hash password ---> to be done in the user model
    const user = await UserModel.create({
      name,
      email,
      picture: picture || DEFAULT_PICTURE,
      status: status || DEFAULT_STATUS,
      password,
    });
    return user;
  }
);
export const signUser = async (email, password) => {
  if (!email || !password)
    throw createHttpError.BadRequest("Please fill all fields");
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();
  //check if user exist
  if (!user) throw createHttpError.NotFound("Invalid credentials.");
  //compare passwords
  let passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) throw createHttpError.NotFound("Invalid credentials.");
  return user;
};
