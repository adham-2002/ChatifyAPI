import asyncHandler from "express-async-handler";
import { createUser } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";

const register = asyncHandler(async (req, res) => {
  const newUser = await createUser(req.body);
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
    path: "/api/v1/auth/refresh-token",
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
  res.send(req.body);
});
const logout = asyncHandler(async (req, res) => {
  res.send(req.body);
});
const refreshToken = asyncHandler(async (req, res) => {
  res.send(req.body);
});

export { register, login, logout, refreshToken };
