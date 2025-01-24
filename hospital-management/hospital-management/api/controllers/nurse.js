import Nurse from "../models/nurseModal.js";

import ErrorHandler from "../utils/ErrorHandler.js";

export const createNurse = async (req, res, next) => {
  try {
    const {filename} = req.file
    const { name, department, jobTitle, timing, days } = req.body;

    if (!req.file) {
      return next(new ErrorHandler("Profile image is required.", 400));
    }

    const newNurse = new Nurse({
      name,
      department,
      jobTitle,
      timing,
      days,
      image:filename,
    });

    const savedNurse = await newNurse.save();

    res.status(201).json({
      success: true,
      message: "Nurse created successfully.",
      nurse: savedNurse,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNurse = async (req, res, next) => {
  try {
    const nurses = await Nurse.find();
    res.status(200).json({
      success: true,
      nurses,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNurse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const nurse = await Nurse.findByIdAndDelete(id);

    if (!nurse) {
      return next(new ErrorHandler("Nurse not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Nurse deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
