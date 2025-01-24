import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const userRole = localStorage.getItem("role");

  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtected;
