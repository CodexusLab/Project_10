import express from "express"
import { borrowBook, getBorrowedBooks, getUserProfile, loginUser, logoutUser, registerUser, returnBook } from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js"

const userRouter = express.Router()


userRouter.post("/sign-in",registerUser)

userRouter.post("/log-in",loginUser)

userRouter.post("/logout",isAuthenticated,logoutUser)

userRouter.get("/me",isAuthenticated,getUserProfile)

userRouter.get("/user/borrowed-book",isAuthenticated,getBorrowedBooks)

userRouter.put("/borrow/:bookId",isAuthenticated,borrowBook)

userRouter.put("/return/:bookId",isAuthenticated,returnBook)

export default userRouter