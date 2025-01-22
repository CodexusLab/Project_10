import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPolicies: 0,
    policies: [],
  });

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/policy/all-policy",
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setDashboardData({
            totalPolicies: response.data.data.length,
            policies: response.data.data,
          });
        } else {
          console.error("Failed to fetch policies.");
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-blue-600">
          <h3 className="text-lg font-medium text-gray-700">Total Policies</h3>
          <p className="text-3xl font-semibold text-blue-600 mt-2">
            {dashboardData.totalPolicies}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-green-600">
          <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
          <p className="text-3xl font-semibold text-green-600 mt-2">100</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-yellow-600">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Recent Policies
          </h3>
          <ul className="space-y-2 text-left">
            {dashboardData.policies.length > 0 ? (
              dashboardData.policies.map((policy, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded"
                >
                  <span className="text-gray-700">{policy.policyName}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(policy.expiryDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </li>
              ))
            ) : (
              <li>No policies found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
