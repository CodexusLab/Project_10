import express from "express"
import { createDoctor, deleteDoctor, editDoctor, getAllDoctor } from "../controllers/doctor.js"
import upload from "../utils/upload.js";
import { validateDoctor } from "../middleware/validateDoctor.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const doctorRouter = express.Router()

doctorRouter.post("/create-doctor",isAuthenticated,isAdmin,upload.single("image"), validateDoctor, createDoctor);

doctorRouter.get("/all-doctor-admin",isAuthenticated,isAdmin,getAllDoctor)

doctorRouter.get("/all-doctor",isAuthenticated,getAllDoctor);

doctorRouter.put("/edit-doctor/:id",upload.single("image"), validateDoctor, editDoctor);

doctorRouter.delete("/delete-doctor/:id",isAuthenticated,isAdmin,deleteDoctor);

export default doctorRouter
