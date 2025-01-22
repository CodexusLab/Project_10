import "./app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddPolicy from "./pages/AddPolicy";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ManageUsers from "./pages/ManageUsers";
import ManagePolicies from "./pages/ManagePolicies";
import AdminDashboard from "./pages/AdminDashboard";
import EditPolicy from "./pages/EditPolicy";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtected from "./components/AdminProtected";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-policy"
          element={
            <ProtectedRoute>
              <AddPolicy />
            </ProtectedRoute>
          }
        />
        <Route path="/admin">
          <Route
            path="dashboard"
            element={
              <div className="flex">
                <AdminProtected>
                  <Sidebar />
                  <AdminDashboard />
                </AdminProtected>
              </div>
            }
          />
          <Route
            path="manage-policies"
            element={
              <div className="flex">
                <AdminProtected>
                  {" "}
                  <Sidebar />
                  <ManagePolicies />
                </AdminProtected>
              </div>
            }
          />
          <Route
            path="manage-users"
            element={
              <div className="flex">
                <AdminProtected>
                  <Sidebar />
                  <ManageUsers />
                </AdminProtected>
              </div>
            }
          />
          <Route
            path="edit-policy/:id"
            element={
              <div className="flex">
                <AdminProtected>
                  <Sidebar />
                  <EditPolicy />
                </AdminProtected>
              </div>
            }
          />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
