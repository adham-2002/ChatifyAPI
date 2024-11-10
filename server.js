import app from "./app.js";
import logger from "./configs/logger.config.js";
import dbConnection from "./configs/database.config.js";
import { Server } from "socket.io";
import Socketserver from "./socketServer.js";
const PORT = process.env.PORT || 8000;

// Database connection
dbConnection();

// Start HTTP Server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Initialize Socket.IO
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT || "http://localhost:3000",
  },
});
// event when client connect to server
io.on("connection", (socket) => {
  logger.info(`User connected: ${socket.id}`);
  Socketserver(socket, io);
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
// console.table(process.memoryUsage());
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  }
});
