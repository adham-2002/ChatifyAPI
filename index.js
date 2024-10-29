import app from "./app.js";
import logger from "./configs/logger.config.js";
import dbConnection from "./configs/database.config.js";
const PORT = process.env.PORT || 8000;

// Database connection
dbConnection();
// Start Server

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

//! Handle Server Errors
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
