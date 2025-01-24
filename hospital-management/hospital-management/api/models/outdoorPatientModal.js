import mongoose from "mongoose";

const outdoorPatientSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true, 
    },
    patientName: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: String, 
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    doctorAssigned: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OutdoorPatient = mongoose.model("OutdoorPatient", outdoorPatientSchema);

export default OutdoorPatient;
