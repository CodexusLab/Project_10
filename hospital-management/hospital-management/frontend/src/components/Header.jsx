import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import axios from "axios"
import toast from "react-hot-toast"

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
        <div className="logo">
          <img
            src="https://cdn.pixabay.com/photo/2023/07/04/07/25/self-consciousness-8105584_640.jpg"
            alt=""
          />
        </div>
        <div className="login-icon">
          <Link to={"/login"}>
            {user ? (
              <BiLogOut size={24} color="red" title="Logout" onClick={handleLogout}/>
            ) : (
              <AiOutlineLogin size={44} title="Login"/>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
