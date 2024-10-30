import asyncHandler from "express-async-handler";
import { createUser } from "../services/auth.service.js";
const register = asyncHandler(async (req, res) => {
  const newUser = await createUser(req.body);
  res.status(201).json({
    status: "success",
    data: {
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
