import express from "express";
import { connectDB } from "./utils/db.js";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import { ErrorMiddleware } from "./middlewares/error.js";
import adminRouter from "./routes/admin.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API WORKING",
  });
});

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API IS WORKING ALL API IS WORKING",
  });
});

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization,Origin,Accept",
};
app.use(cors(corsOptions));


app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(ErrorMiddleware)


app.use("/api/v1/auth", userRouter);

app.use("/api/v1/admin", adminRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
