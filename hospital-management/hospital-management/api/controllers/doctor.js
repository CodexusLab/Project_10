import Doctor from "../models/doctorModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createDoctor = async (req, res, next) => {
  try {
    const {filename} = req.file
    const { name, department, qualification, timing, days } = req.body;

    if (!filename) {
      return next(new ErrorHandler("Profile image is required.", 400));
    }

    const newDoctor = new Doctor({
      name,
      department,
      qualification,
      timing,
      days,
      image:filename,
    });

    const savedDoctor = await newDoctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor created successfully.",
      doctor: savedDoctor,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDoctor = async (req, res, next) => {
  try {
    const doctors = await Doctor.find(); 
    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    next(error);
  }
};

export const editDoctor = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { name, department, qualification, timing, days } = req.body;

    const updatedData = { name, department, qualification, timing, days };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoctor) {
      return next(new ErrorHandler("Doctor not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully.",
      doctor: updatedDoctor,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const { id } = req.params; 

    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
      return next(new ErrorHandler("Doctor not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
