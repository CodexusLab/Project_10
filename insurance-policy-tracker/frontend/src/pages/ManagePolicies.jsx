import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ManagePolicies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/policy/all-policy",
          { withCredentials: true }
        );
        if (response.data.success) {
          setPolicies(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch policies.");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while fetching policies."
        );
      }
    };

    fetchPolicies();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this policy?"
      );
      if (!confirmDelete) return;

      const response = await axios.delete(
        `http://localhost:8000/api/v1/policy/delete-policy/${id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setPolicies((prevPolicies) =>
          prevPolicies.filter((policy) => policy._id !== id)
        );
      } else {
        toast.error(response.data.message || "Failed to delete the policy.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the policy."
      );
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Policies</h2>
      <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-6">
        Add New Policy
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Policy Name
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Type
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Holder
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Contact
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Expiry Date
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Status
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr
                key={policy._id}
                className={`border-b hover:bg-gray-50 ${
                  policy.status === "Expired" ? "bg-red-100" : ""
                }`}
              >
                <td className="py-3 px-6">{policy.policyName}</td>
                <td className="py-3 px-6">{policy.policyType}</td>
                <td className="py-3 px-6">{policy.policyHolderName}</td>
                <td className="py-3 px-6">{policy.contactInfo}</td>
                <td className="py-3 px-6">
                  {new Date(policy.expiryDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td
                  className={`py-3 px-6 font-semibold ${
                    policy.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {policy.status}
                </td>
                <td className="py-3 px-6 flex items-center">
                  <Link to={`/admin/edit-policy/${policy._id}`} state={policy}>
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="text-red-600 hover:underline ml-4"
                    onClick={() => handleDelete(policy._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePolicies;
