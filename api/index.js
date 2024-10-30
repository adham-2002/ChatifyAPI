import app from "../app.js";
import logger from "../configs/logger.config.js";
import dbConnection from "../configs/database.config.js";

// Database connection
dbConnection();

export default function handler(req, res) {
  // استخدم الدالة app لتشغيل تطبيق Express الخاص بك
  app(req, res);
}

// معالجة الأخطاء (اختياري)
process.on("uncaughtException", (error) => {
  logger.error(error);
});

process.on("unhandledRejection", (error) => {
  logger.error(error);
});
