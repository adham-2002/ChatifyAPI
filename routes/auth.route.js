import express from "express";
import trimRequest from "trim-request";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";
const router = express.Router();
router.use(trimRequest.all); // remove whitespace from request
router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/refreshtoken").post(refreshToken);
export default router;
