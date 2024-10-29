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
  })
);
//cors
app.use(cors());

app.get("/test", (req, res) => {
  throw createHttpError.BadRequest("This is a test error");
});
app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
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
