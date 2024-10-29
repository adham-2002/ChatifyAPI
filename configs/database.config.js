import mongoose from "mongoose";
import logger from "./logger.config.js";

const dbConnection = () => {
  // Use the environment variables for the database connection
  const DB_URL = process.env.DATABASE_BASE_URL.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  ).replace("<DATABASE_NAME>", process.env.DATABASE_NAME);
  // Set strictQuery option for Mongoose
  mongoose.set("strictQuery", true);

  // MongoDB debug mode
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
    logger.info("MongoDB debug mode on");
  }

  // Handle connection errors
  mongoose.connection.on("error", (error) => {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  });

  // Connect to the database
  mongoose
    .connect(DB_URL, {})
    .then(() => {
      logger.info("DB Connection successful 🥳");
    })
    .catch((error) => {
      logger.error(`MongoDB connection error: ${error.message}`);
      process.exit(1); // Exit the process with failure
    });
};

export default dbConnection;
