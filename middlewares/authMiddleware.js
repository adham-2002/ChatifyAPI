import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export default asyncHandler(async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createHttpError.Unauthorized("Please login"));
  }
  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      return next(createHttpError.Unauthorized("Please login"));
    }
    req.user = payload;
    console.log(req.user);
    next();
  });
});
