import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
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
      default: process.env.DEFAULT_STATUS,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      maxLength: [128, "Password should be less than 128 characters"],
    },
    picture: {
      type: String,
      default: process.env.DEFAULT_PICTURE,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);
userSchema.pre("save", async function (next) {
  try {
    //password hashing
    if (this.isNew) {
      const hashedPassword = await bcrypt.hash(this.password, 12);
      this.password = hashedPassword;
      next();
    }
  } catch (error) {
    next(error);
  }
});
const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
export default UserModel;
