import express from "express"
import upload from "../utils/upload.js";
import { AllIndoorPatient, createIndoorPatient, deleteIndoorPatient } from "../controllers/indoorPatient.js";
import { validateIndoorPatient } from "../middleware/validateDoctor.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const indoorPatientRouter = express.Router()

indoorPatientRouter.post("/create-indoor-patient",isAuthenticated,isAdmin,upload.single("image"),validateIndoorPatient,createIndoorPatient);

indoorPatientRouter.get("/all-indoor-patient",isAuthenticated,AllIndoorPatient);

// nurseRouter.put("/edit-doctor/:id",upload.single("image"), validateNurse);

indoorPatientRouter.delete("/delete-indoor-patient/:id",isAuthenticated,isAdmin,deleteIndoorPatient);

export default indoorPatientRouter
