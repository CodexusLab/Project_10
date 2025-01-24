import ErrorHandler from "../utils/ErrorHandler.js";

export const validateDoctor = (req, res, next) => {
  const { name, department, qualification, timing, days } = req.body;

  if (!name || name.trim() === "") {
    return next(new ErrorHandler("Doctor's name is required.", 400));
  }
  if (!department || department.trim() === "") {
    return next(new ErrorHandler("Department is required.", 400));
  }
  if (!qualification || qualification.trim() === "") {
    return next(new ErrorHandler("Qualification is required.", 400));
  }
  if (!timing || timing.trim() === "") {
    return next(new ErrorHandler("Working hours are required.", 400));
  }
  if (!days || days.trim() === "") {
    return next(new ErrorHandler("Available days are required.", 400));
  }

  next();
};

export const validateNurse = (req, res, next) => {
  const { name, department, jobTitle, timing, days } = req.body;

  if (!name || name.trim() === "") {
    return next(new ErrorHandler("Nurses's name is required.", 400));
  }
  if (!department || department.trim() === "") {
    return next(new ErrorHandler("Department is required.", 400));
  }
  if (!jobTitle || jobTitle.trim() === "") {
    return next(new ErrorHandler("Job Title is required.", 400));
  }
  if (!timing || timing.trim() === "") {
    return next(new ErrorHandler("Working hours are required.", 400));
  }
  if (!days || days.trim() === "") {
    return next(new ErrorHandler("Available days are required.", 400));
  }

  next();
};

export const validateIndoorPatient = (req, res, next) => {
  const { patientName, department, roomNumber, admissionDate, dischargeDate } =
    req.body;

  if (!patientName || patientName.trim() === "") {
    return next(new ErrorHandler("Indoor Patient name is required.", 400));
  }
  if (!department || department.trim() === "") {
    return next(new ErrorHandler("Department is required.", 400));
  }
  if (!roomNumber || roomNumber.trim() === "") {
    return next(new ErrorHandler("roomNumber is required.", 400));
  }
  if (!admissionDate || admissionDate.trim() === "") {
    return next(new ErrorHandler("Admission Date are required.", 400));
  }
  if (!dischargeDate || dischargeDate.trim() === "") {
    return next(new ErrorHandler("Discharge Date are required.", 400));
  }

  next();
};

export const validateOutdoorPatient = (req, res, next) => {
  const { patientName, department,  appointmentDate, doctorAssigned, status } =
    req.body;

  if (!patientName || patientName.trim() === "") {
    return next(new ErrorHandler("Indoor Patient name is required.", 400));
  }
  if (!department || department.trim() === "") {
    return next(new ErrorHandler("Department is required.", 400));
  }
  if (!appointmentDate || appointmentDate.trim() === "") {
    return next(new ErrorHandler("Appointment Date is required.", 400));
  }
  if (!doctorAssigned || doctorAssigned.trim() === "") {
    return next(new ErrorHandler("Doctor Assigned are required.", 400));
  }
  if (!status || status.trim() === "") {
    return next(new ErrorHandler("Status are required.", 400));
  }

  next();
};