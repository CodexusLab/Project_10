import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/policy/all-policy", {
          withCredentials: true, 
        });

        if (response.data.success) {
          setPolicies(response.data.data);
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Your Policies</h2>
        <div className="space-y-4">
          {policies.length > 0 ? (
            policies.map((policy) => (
              <div key={policy.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-medium text-xl">{policy.policyName}</h3>
                <p className="text-sm text-gray-600">Expiry Date: {policy.expiryDate}</p>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-md">No policies available.</div>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link to="/add-policy" className="text-blue-500">Add a new policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
