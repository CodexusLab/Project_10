import express from "express";
import { connectDB } from "./utils/db.js";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error.js";
import musicRouter from "./routes/music.js";
import path from "path";

dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API WORKING",
  });
});

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization,Origin,Accept",
};
app.use(cors(corsOptions));

app.use("/uploads", express.static("./uploads"));

app.use(morgan("dev"));

// app.use("/api/v1/auth",userRouter)
app.use("/api/v1/music", musicRouter);



app.use(ErrorMiddleware);

app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
