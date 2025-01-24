import mongoose from "mongoose";

const nurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  jobTitle: { type: String, required: true },
  timing: { type: String, required: true },
  days: { type: String, required: true },
  image: { type: String, required: true },
});

const Nurse = mongoose.model("Nurse", nurseSchema);
export default Nurse;
