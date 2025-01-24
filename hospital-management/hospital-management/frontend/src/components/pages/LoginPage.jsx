import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = ({ togglePage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/log-in",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message, { duration: 3000 });
        localStorage.setItem("role", response.data?.user?.role);
        navigate("/");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during registration.";
      toast.error(errorMessage, { duration: 3000 });
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="email">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="email..."
              />
            </div>
            <div className="password">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="password..."
              />
            </div>
            <p>
              {"Don't"} have an account ?{" "}
              <span className="tag" onClick={togglePage}>
                Register
              </span>
            </p>
            <button>Log In</button>
          </form>
        </div>
        <div className="login-img">
          <img
            src="https://cdn.pixabay.com/photo/2024/02/16/06/26/dentist-8576790_640.png"
            alt=""
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default LoginPage;
