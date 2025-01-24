import mongoose from "mongoose"

const policySchema = new mongoose.Schema({
  policyName: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  policyType: {
    type: String,
    enum: ['Health', 'Life', 'Car'], 
    default: 'Health',
  },
  policyHolderName: {
    type: String,
    default: '',
  },
  contactInfo: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Active', 'Expired'], 
    default: 'Active',
  },
}, { timestamps: true }); 

const Policy = mongoose.model('Policy', policySchema);

export default Policy;
