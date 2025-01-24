import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem("role");
  const handleLogout = async() => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/logout",{}, {
        withCredentials: true, 
      });
  
      if (response.data.success) {
        toast.success(response.data.message, { duration: 3000 });
        localStorage.removeItem("role")
        navigate("/login"); 
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during logout.";
      toast.error(errorMessage, { duration: 3000 });
    }
  }
  return (
    <div>
      <div className="header">
        <h1>Library Management System</h1>
        {user ? (
          <div className="sign-in-btn">
            <Link to={"/"}>
              <button className="logged-in">DashBoard</button>
            </Link>

            <button onClick={handleLogout} className="sign-up">Logout</button>
          </div>
        ) : (
          <div className="sign-in-btn">
            <Link to={"/login"}>
              <button className="logged-in">Log In</button>
            </Link>
            <Link to={"/signup"}>
              <button className="sign-up">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
