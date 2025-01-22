import Book from "../models/adminModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createBook = async (req, res, next) => {
  const allowedCategories = ["Fiction", "Non-Fiction", "Science", "History", "Autobiography"];
  try {
    const { name, isbn, category, quantity, available, price } = req.body;

    if (
      !name ||
      !isbn ||
      !category ||
      quantity === undefined ||
      available === undefined ||
      !price
    ) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    if (!allowedCategories.includes(category)) {
      return next(new ErrorHandler("Invalid category. Please select a valid category.", 400));
    }

    const newBook = new Book({
      name,
      isbn,
      category,
      quantity,
      available,
      price,
    });

    await newBook.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully.",
      book: newBook,
    });
  } catch (error) {
    next(new ErrorHandler(error.message || "Server error.", 500));
  }
};

export const getSingleBook = async (req, res,next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }

    res.status(200).json({ success: true, book });
  } catch (error) {
    next(new ErrorHandler(error.message || "Server error.", 500));
  }
};

export const getAllBook = async (req, res,next) => {
  try {
    const books = await Book.find();

    res.status(200).json({ success: true, books });
  } catch (error) {
    next(new ErrorHandler(error.message || "Server error.", 500));
  }
};

export const updateBook = async (req, res, next) => {
  const allowedCategories = ["Fiction", "Non-Fiction", "Science", "History", "Autobiography"];
  try {
    const { name, isbn, category, quantity, available, price } = req.body;

    if (
      !name ||
      !isbn ||
      !category ||
      quantity === undefined ||
      available === undefined ||
      !price
    ) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    if (!allowedCategories.includes(category)) {
      return next(new ErrorHandler("Invalid category. Please select a valid category.", 400));
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { name, isbn, category, quantity, available, price },
      { new: true, runValidators: true }
    );

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully.",
      book,
    });
  } catch (error) {
    next(new ErrorHandler(error.message || "Server error.", 500));
  }
};

export const deleteBook = async (req, res,next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully." });
  } catch (error) {
    next(new ErrorHandler(error.message || "Server error.", 500));
  }
};
