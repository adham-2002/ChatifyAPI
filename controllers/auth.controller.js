import asyncHandler from "express-async-handler";
import { createUser, signUser } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../services/token.service.js";
import { findUser } from "../services/user.service.js";
import createHttpError from "http-errors";
const register = asyncHandler(async (req, res) => {
  const { name, email, picture, status, password } = req.body;
  const newUser = await createUser(name, email, picture, status, password);
  // generate tokens for one hour
  const access_token = await generateToken(
    { _id: newUser._id },
    "1h",
    process.env.ACCESS_TOKEN_SECRET
  );
  const refresh_token = await generateToken(
    { _id: newUser._id },
    "30d",
    process.env.REFRESH_TOKEN_SECRET
  );
  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    status: "success",
    data: {
      access_token,
      user: newUser,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await signUser(email, password);
  const access_token = await generateToken(
    { _id: user._id },
    "1h",
    process.env.ACCESS_TOKEN_SECRET
  );
  const refresh_token = await generateToken(
    { _id: user._id },
    "30d",
    process.env.REFRESH_TOKEN_SECRET
  );
  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
    // path: "/api/v1/auth/refreshtoken",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "Login success",
    data: {
      access_token,
      user,
    },
  });
});
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    // path: "/api/v1/auth/refreshtoken",
  });
  res.json({
    message: "Logout success",
  });
});
const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(req.cookies);
  if (!refreshToken) {
    throw createHttpError.Unauthorized("Please login");
  }
  const check = await verifyToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (!check) {
    throw createHttpError.Unauthorized("Please login");
  }
  const user = await findUser(check._id);
  const access_token = await generateToken(
    { _id: user._id },
    "1h",
    process.env.ACCESS_TOKEN_SECRET
  );
  res.status(200).json({
    status: "success",
    data: {
      access_token,
      user,
    },
  });
});

export { register, login, logout, refreshToken };
