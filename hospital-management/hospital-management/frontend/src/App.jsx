import Header from "./components/Header";
import "./app.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import AdminPage from "./components/admin/AdminPage";
import {Toaster} from "react-hot-toast"
import ProtectedRoute from "./components/pages/ProtectedRoute";
import AdminProtected from "./components/pages/AdminProtected";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminProtected><AdminPage/></AdminProtected>}/>
        </Routes>
        <Toaster position="center"/>
      </Router>
    </div>
  );
};

export default App;
