import express from "express"
import { deleteUser, getAllUsers, loginUser, logoutUser, registerUser } from "../controllers/user.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router()

userRouter.post("/register",registerUser);

userRouter.post("/login",loginUser);

userRouter.post("/logout",isAuthenticated,logoutUser);

userRouter.get("/all-users",isAuthenticated,isAdmin,getAllUsers)

userRouter.delete("/delete-user/:userId",isAuthenticated,isAdmin,deleteUser)

export default userRouter
