import app from "../app.js";
import logger from "../configs/logger.config.js";
import dbConnection from "../configs/database.config.js";
import { Server } from "socket.io";
import Socketserver from "../socketServer.js";

const PORT = process.env.PORT || 8000;

// Database connection
dbConnection();

// Create an HTTP server instance
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

// Event when a client connects to the server
io.on("connection", (socket) => {
  logger.info(`User connected: ${socket.id}`);
  // Socketserver function handles socket-specific events
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

// Handle uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// Handle graceful shutdown on SIGTERM signal
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  }
});

export default function handler(req, res) {
  // Use the app function to handle incoming requests
  app(req, res);
}
