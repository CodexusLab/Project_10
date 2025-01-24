import IndoorPatient from "../models/indoorPatientModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createIndoorPatient = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const { patientName, roomNumber, department, admissionDate,dischargeDate } = req.body;

    if (!filename) {
      return next(new ErrorHandler("Profile image is required.", 400));
    }

    const newIndoorPatient = new IndoorPatient({
      patientName,
      roomNumber,
      department,
      admissionDate,
      dischargeDate,
      image: filename,
    });

    const savedIndoorPatient = await newIndoorPatient.save();

    res.status(201).json({
      success: true,
      message: "Indoor Patient created successfully.",
      indoorPatient: savedIndoorPatient,
    });
  } catch (error) {
    next(error);
  }
};

export const AllIndoorPatient = async (req, res, next) => {
    try {
        const indoorPatient = await IndoorPatient.find(); 
        res.status(200).json({
          success: true,
          indoorPatient,
        });
      } catch (error) {
        next(error);
      }
};

export const deleteIndoorPatient = async (req, res, next) => {
    try {
        const { id } = req.params; 
    
        const indoorPatient = await IndoorPatient.findByIdAndDelete(id);
    
        if (!indoorPatient) {
          return next(new ErrorHandler("Indoor Patient not found.", 404));
        }
    
        res.status(200).json({
          success: true,
          message: "Indoor Patient deleted successfully.",
        });
      } catch (error) {
        next(error);
      }
};
