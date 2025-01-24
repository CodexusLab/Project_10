import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddPolicy = () => {
  const navigate = useNavigate()
  const [policy, setPolicy] = useState({
    policyName: "",
    expiryDate: "",
    policyType: "",
    policyHolderName: "",
    contactInfo: "",
    status: "Active",
  });

  const handleAddPolicy = async (e) => {
    e.preventDefault();

    try {
      if (!policy.policyName || !policy.expiryDate || !policy.policyType || !policy.policyHolderName || !policy.contactInfo) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/policy/create-policy",
        { ...policy },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Policy added successfully!");
       setTimeout(()=>{
        navigate("/dashboard")
       },1000)
        setPolicy({
          policyName: "",
          expiryDate: "",
          policyType: "",
          policyHolderName: "",
          contactInfo: "",
          status: "Active",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add policy.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicy({
      ...policy,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-md w-128" style={{ width: "600px" }}>
        <h2 className="text-center text-2xl font-bold mb-6">Add a New Policy</h2>

        <form onSubmit={handleAddPolicy}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Policy Name</label>
            <input
              type="text"
              name="policyName"
              value={policy.policyName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Policy Type</label>
            <select
              name="policyType"
              value={policy.policyType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-none"
              required
            >
              <option value="">Select Policy Type</option>
              <option value="Health">Health</option>
              <option value="Life">Life</option>
              <option value="Car">Car</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Policy Holder Name</label>
            <input
              type="text"
              name="policyHolderName"
              value={policy.policyHolderName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={policy.contactInfo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={policy.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={policy.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-none"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded outline-none">
            Add Policy
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPolicy;
