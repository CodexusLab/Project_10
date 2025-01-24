import User from "../models/userModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const registerUser = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return next(new ErrorHandler("All fields are required", 400));
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new ErrorHandler("User already exists", 409));
      }
  
      const user = await User.create({ username, email, password });
  
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  export const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return next(new ErrorHandler("Email and password are required", 400));
      }
  
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
  
      const isMatch = await user.isPasswordCorrect(password);
      if (!isMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

    
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge:2 * 24 * 60 * 60 * 1000, 
      });
      user.password = undefined
  
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  export const logoutUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if(user){
        res.cookie("token", "", {
          httpOnly: true,
          secure: false, 
          sameSite: "strict", 
          expires: new Date(0), 
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  export const getUserProfile = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
  
      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  };