import ErrorHandler from "../utils/ErrorHandler.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/userModal.js";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler("Authentication token is required", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    next(new ErrorHandler("Invalid or expired token", 401));
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Access denied. Admins only", 403));
  }

  next();
};
