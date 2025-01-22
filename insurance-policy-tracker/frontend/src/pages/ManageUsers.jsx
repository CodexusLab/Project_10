import  { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/auth/all-users", { withCredentials: true });
        setUsers(response.data.users); 
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/auth/delete-user/${userId}`, {
        withCredentials: true,
      });
  
      if (response.data.success) {
        toast.success(`User deleted successfully.`);
        
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred while deleting the user.");
    }
  };
  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-gray-600">User Name</th>
            <th className="py-3 px-6 text-left text-gray-600">Email</th>
            <th className="py-3 px-6 text-left text-gray-600">Role</th>
            <th className="py-3 px-6 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            
            <tr key={user.id} className="border-b">
              <td className="py-3 px-6">{user.username}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.role}</td>
              <td className="py-3 px-6">
                
                <button
                  className="text-red-600 hover:underline ml-4"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
