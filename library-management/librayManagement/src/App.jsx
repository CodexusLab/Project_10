import "./app.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Books from "./pages/Books";
import AdminTable from "./admin/AdminTable";
import CreateBook from "./admin/CreateBook";
import EditBook from "./admin/EditBook";
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/books/:bookId" element={<Books/>}/>
          <Route path="/admin/dashboard" element={<AdminTable/>}/>
          <Route path="/admin/dashboard/create-book" element={<CreateBook/>}/>
          <Route path="/edit-book/:id" element={<EditBook/>}/>
        </Routes>
        <Toaster position="top-center"/>
      </div>
    </Router>
  );
};

export default App;
