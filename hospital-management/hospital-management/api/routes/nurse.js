import express from "express"
import upload from "../utils/upload.js";
import {  validateNurse } from "../middleware/validateDoctor.js";
import { createNurse, deleteNurse, getAllNurse } from "../controllers/nurse.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const nurseRouter = express.Router()

nurseRouter.post("/create-nurse",isAuthenticated,isAdmin,upload.single("image"), validateNurse,createNurse);

nurseRouter.get("/all-nurse",isAuthenticated,getAllNurse);

// nurseRouter.put("/edit-doctor/:id",upload.single("image"), validateNurse);

nurseRouter.delete("/delete-nurse/:id",isAuthenticated,isAdmin,deleteNurse);

export default nurseRouter
