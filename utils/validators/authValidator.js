import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import UserModel from "../../models/userModel.js";
export const registerValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 16 })
    .withMessage("Name must be between 3 and 16 characters"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom((val) => {
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already in use"));
        }
      });
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 8,
      max: 128,
    })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/)
    .withMessage("Password must contain at least one special character"),
  validatorMiddleware,
];

export const loginValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 8,
    })
    .withMessage("Password must be at least 8 characters"),
  validatorMiddleware,
];
