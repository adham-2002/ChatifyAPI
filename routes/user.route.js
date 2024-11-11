import express from "express";
import {
  searchUsers,
  getLoggedInUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(authMiddleware, searchUsers);
router.route("/getme").get(authMiddleware, getLoggedInUser);

export default router;
