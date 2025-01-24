import OutdoorPatient from "../models/outdoorPatientModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createOutDoorPatient = async(req,res,next) => {
    try {
        const { filename } = req.file;
        const { patientName, appointmentDate, department, doctorAssigned,status } = req.body;
    
        if (!filename) {
          return next(new ErrorHandler("Profile image is required.", 400));
        }
    
        const newOutdoorPatient = new OutdoorPatient({
          patientName,
          appointmentDate,
          department,
          doctorAssigned,
          status,
          image: filename,
        });
    
        const savedOutdoorPatient = await newOutdoorPatient.save();
    
        res.status(201).json({
          success: true,
          message: "Outdoor Patient created successfully.",
          outdoorPatient: savedOutdoorPatient,
        });
      } catch (error) {
        next(error);
      }
}

export const AllOutDoorPatient = async(req,res,next) => {
    try {
        const outdoorPatient = await OutdoorPatient.find(); 
        res.status(200).json({
          success: true,
          outdoorPatient,
        });
      } catch (error) {
        next(error);
      }
}

export const deleteOutDoorPatient = async(req,res,next) => {
    try {
        const { id } = req.params; 
    
        const outdoorPatient = await OutdoorPatient.findByIdAndDelete(id);
    
        if (!outdoorPatient) {
          return next(new ErrorHandler("Outdoor Patient not found.", 404));
        }
    
        res.status(200).json({
          success: true,
          message: "Outdoor Patient deleted successfully.",
        });
      } catch (error) {
        next(error);
      }
}