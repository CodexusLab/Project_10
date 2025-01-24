import express from "express"
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.js"
import { isAuthenticated } from "../middleware/auth.js"

const userRouter = express.Router()


userRouter.post("/sign-in",registerUser)

userRouter.post("/log-in",loginUser)

userRouter.post("/logout",isAuthenticated,logoutUser)

userRouter.get("/me",isAuthenticated,getUserProfile)

export default userRouter