import Policy from "../models/insuranceModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";


export const createPolicy = async (req, res, next) => {
  try {
    const { policyName, expiryDate, policyType, policyHolderName, contactInfo, status } = req.body;

    // Validation
    if (!policyName) {
      return next(new ErrorHandler("Policy name is required", 400));
    }
    if (!expiryDate) {
      return next(new ErrorHandler("Expiry date is required", 400));
    }
    if (!policyType) {
      return next(new ErrorHandler("Policy type is required", 400));
    }
    if (!policyHolderName) {
      return next(new ErrorHandler("Policy holder name is required", 400));
    }
    if (!contactInfo) {
      return next(new ErrorHandler("Contact info is required", 400));
    }
    if (!status) {
      return next(new ErrorHandler("Status is required", 400));
    }

    const newPolicy = new Policy({
      policyName,
      expiryDate,
      policyType,
      policyHolderName,
      contactInfo,
      status,
    });

    const savedPolicy = await newPolicy.save();

    res.status(201).json({
      success: true,
      message: "Policy created successfully",
      data: savedPolicy,
    });
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to create policy", 500));
  }
};

export const editPolicy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return next(new ErrorHandler("No updates provided", 400));
    }

    const updatedPolicy = await Policy.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedPolicy) {
      return next(new ErrorHandler("Policy not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Policy updated successfully",
      data: updatedPolicy,
    });
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to update policy", 500));
  }
};

export const getPolicyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const policy = await Policy.findById(id);

    if (!policy) {
      return next(new ErrorHandler("Policy not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Policy fetched successfully",
      data: policy,
    });
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to fetch policy", 500));
  }
};


export const getAllPolicies = async (req, res, next) => {
    try {
      const policies = await Policy.find();
  
      res.status(200).json({
        success: true,
        message: "All policies fetched successfully",
        data: policies,
      });
    } catch (error) {
      next(new ErrorHandler(error.message || "Failed to fetch policies", 500));
    }
  };

export const deletePolicy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPolicy = await Policy.findByIdAndDelete(id);

    if (!deletedPolicy) {
      return next(new ErrorHandler("Policy not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Policy deleted successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to delete policy", 500));
  }
};
