import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
        toast.success("Login successful!", { duration: 3000 });
        localStorage.setItem("role",response.data?.user?.role)
        navigate("/");
        if (response.data?.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during registration.";
      toast.error(errorMessage, { duration: 3000 });
    }
  };
  return (
    <div>
      <div className="register-container">
        <div className="register-box">
          <h2 className="title">Welcome to Login Page</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="login-link">
              <p>
                {"Don't"} have an account?{" "}
                <a href="/signup" className="link-text">
                  Sign Up
                </a>
              </p>
            </div>

            <button type="submit" className="register-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
