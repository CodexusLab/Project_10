import mongoose from 'mongoose';

const indoorPatientSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  admissionDate: {
    type: String,  
    required: true,
  },
  dischargeDate: {
    type: String,  
    required: true,
  },
});

const IndoorPatient = mongoose.model('IndoorPatient', indoorPatientSchema);

export default IndoorPatient;
