import mongoose from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";
const { DB_URL } = process.env;
const PORT = process.env.PORT || 8000;
// exit on mongodb error
mongoose.connection.on("error", (error) => {
  logger.error(error);
  process.exit(1);
});
//mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
  // console.log("MongoDB debug mode on");
}
//mongodb connection
mongoose.connect(DB_URL, {}).then(() => {
  logger.info("MongoDB connected");
});

let server;
server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle Server Errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  }
});
