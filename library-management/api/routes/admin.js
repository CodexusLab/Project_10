import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createBook,
  deleteBook,
  getAllBook,
  getSingleBook,
  updateBook,
} from "../controllers/admin.js";

const adminRouter = express.Router();

adminRouter.post("/create", createBook);

adminRouter.get("/single-book/:id", isAuthenticated, getSingleBook);

adminRouter.get("/all-book", isAuthenticated, getAllBook);

adminRouter.put("/update-book/:id",isAuthenticated,updateBook)

adminRouter.delete("/delete-book/:id", isAuthenticated, deleteBook);

export default adminRouter;
