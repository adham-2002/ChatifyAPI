import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";

//load dotenv config
dotenv.config();
// create Express App
const app = express();
//! Middlewares
//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
//helmet
app.use(helmet());
//parse json request url
app.use(express.json());
// parse json request body(handle Form Submit /w-www-form)
app.use(express.urlencoded({ extended: true }));
//sanitize request Data prevent noSql injection
app.use(mongoSanitize());
//enable cookie parser read cookies from client
app.use(cookieParser());
//gzip compression
app.use(compression());
//file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.get("/test", (req, res) => {
//   throw createHttpError.BadRequest("This is a test error");
// });
//! Mount Routes
//? api v1 routes
app.use("/api/v1", routes);
app.use(express.static("public"));
app.use(async (req, res, next) => {
  try {
    // Render the index.html file from the public folder
    res.sendFile("index.html", { root: "public" });
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
});
//error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
export default app;
