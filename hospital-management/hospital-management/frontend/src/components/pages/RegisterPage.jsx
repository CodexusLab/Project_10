import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = ({ togglePage,onRegisterSuccess  }) => {
  
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
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/sign-in",
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message, { duration: 3000 });
        onRegisterSuccess()
      } else {
        toast.error(response.data.message);
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
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="Username..."
              />
            </div>
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
              Already have an account ?{" "}
              <span className="tag" onClick={togglePage}>
                Login
              </span>
            </p>
            <button>Sign In</button>
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

export default RegisterPage;
