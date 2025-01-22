import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("role");

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, { duration: 3000 });
        localStorage.removeItem("role");
        navigate("/");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during logout.";
      toast.error(errorMessage, { duration: 3000 });
    }
  };
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">Insurance Tracker</h1>
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/dashboard" className="mr-4">
            Dashboard
          </Link>
          <Link to="/add-policy" className="mr-4">
            Add Policy
          </Link>
          {user ? <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Logout</button> : ""}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
