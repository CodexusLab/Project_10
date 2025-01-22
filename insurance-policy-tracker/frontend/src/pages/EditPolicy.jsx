import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditPolicy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: initialPolicy } = useLocation();

  const [policy, setPolicy] = useState({
    policyName: "",
    expiryDate: "",
    policyType: "",
    policyHolderName: "",
    contactInfo: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialPolicy) {
      setPolicy(initialPolicy);
    } else {
      const fetchPolicy = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/policy/single-policy/${id}`,{ withCredentials: true }
          );
          if (response.data.success) {
            setPolicy(response.data.data);
          } else {
            console.error("Failed to fetch policy data.");
          }
        } catch (error) {
          console.error("Error fetching policy:", error);
        }
      };
      fetchPolicy();
    }
  }, [id, initialPolicy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicy((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePolicy = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/policy/edit-policy/${id}`,
        policy,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Policy updated successfully!");
        setTimeout(() => navigate("/admin/manage-policies"), 2000);
      } else {
        toast.error("Failed to update policy.");
      }
    } catch (error) {
      toast.error("Error updating policy.");
      console.error("Error updating policy:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div
          className="bg-white p-8 rounded-lg shadow-md w-128"
          style={{ width: "600px" }}
        >
          <h2 className="text-center text-2xl font-bold mb-6">Edit Policy</h2>
          <form onSubmit={handleUpdatePolicy}>
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
              >
                <option value="">Select Policy Type</option>
                <option value="Health">Health</option>
                <option value="Life">Life</option>
                <option value="Car">Car</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Policy Holder Name
              </label>
              <input
                type="text"
                name="policyHolderName"
                value={policy.policyHolderName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2 outline-none"
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
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={policy.expiryDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2 outline-none"
              />
            </div>
            <div className="mb-4">
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
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Update Policy
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPolicy;
