import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "UserModel",
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: ObjectId,
      ref: "ConversationModel",
      required: true,
    },
    files: [],
  },
  {
    collection: "messages",
    timestamps: true,
  }
);
const MessageModel =
  mongoose.models.MessageModel || mongoose.model("MessageModel", messageSchema);
export default MessageModel;
