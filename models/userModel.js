import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: [true, "Please Enter a Valid Email"],
      lowercase: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    status: {
      type: String,
      default: "Hey There I'm using Chatify",
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      maxLength: [128, "Password should be less than 128 characters"],
    },
  },
  {
    collation: "users",
    timestamps: true,
  }
);
const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
export default UserModel;
