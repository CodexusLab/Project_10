import express from "express"
import upload from "../utils/upload.js";
import { AllOutDoorPatient, createOutDoorPatient, deleteOutDoorPatient } from "../controllers/outdoorPatient.js";
import { validateOutdoorPatient } from "../middleware/validateDoctor.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const outdoorPatientRouter = express.Router()

outdoorPatientRouter.post("/create-outdoor-patient",isAuthenticated,isAdmin,upload.single("image"),validateOutdoorPatient,createOutDoorPatient);

outdoorPatientRouter.get("/all-outdoor-patient",isAuthenticated,AllOutDoorPatient);

// nurseRouter.put("/edit-doctor/:id",upload.single("image"), validateNurse);

outdoorPatientRouter.delete("/delete-outdoor-patient/:id",isAuthenticated,isAdmin,deleteOutDoorPatient);

export default outdoorPatientRouter
