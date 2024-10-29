import asyncHandler from "express-async-handler";
const register = asyncHandler(async (req, res) => {
  res.send(req.body);
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
