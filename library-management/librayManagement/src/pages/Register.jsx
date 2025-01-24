import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await axios.post("http://localhost:8000/api/v1/auth/sign-in", formData);

      if (response.data.success) {
        toast.success("Registration successful!", { duration: 3000 });
        navigate("/login")
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
          <h2 className="title">Welcome to Register Page</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">UserName</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

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
                Already have an account?{" "}
                <a href="/login" className="link-text">
                  Login
                </a>
              </p>
            </div>

            <button type="submit" className="register-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
