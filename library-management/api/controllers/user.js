import User from "../models/userModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Book from "../models/adminModal.js";

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
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    user.password = undefined;

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
    if (user) {
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

export const borrowBook = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.bookId;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }

    if (book.available <= 0) {
      return next(new ErrorHandler("No copies available to borrow", 400));
    }

    user.borrowedBooks.push(bookId);
    await user.save();

    book.available -= 1;
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message || "Server error.", 500));
  }
};

export const returnBook = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.bookId;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }

    const bookIndex = user.borrowedBooks.indexOf(bookId);
    if (bookIndex === -1) {
      return next(new ErrorHandler("You have not borrowed this book", 400));
    }

    user.borrowedBooks.splice(bookIndex, 1);
    await user.save();

    book.available += 1;
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message || "Server error.", 500));
  }
};

export const getBorrowedBooks = async (req, res, next) => {
  try {
    const userId = req.user.id; 

    const user = await User.findById(userId).populate({
      path: 'borrowedBooks', 
      select: 'name isbn category price', 
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (user.borrowedBooks.length === 0) {
      return next(new ErrorHandler("No borrowed books found", 404));
    }

    res.status(200).json({
      success: true,
      borrowedBooks: user.borrowedBooks,
    });
  } catch (error) {
    next(error);
  }
};
