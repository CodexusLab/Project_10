import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();

    // Request body
    const formData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        formData,
        {
          withCredentials: true, 
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("role", response.data?.user?.role);
        navigate("/dashboard")

        if (response.data?.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
        setEmail("");
        setPassword("");
        
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error. Please try again.");
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border outline-none border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 outline-none"
              required
            />
          </div>
          <p className="pb-5">{"Don't have an account ?"} <Link to={"/register"}><span className="text-blue-700 font-bold">Register</span></Link></p>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
