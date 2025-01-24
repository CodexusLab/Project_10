import { useState } from "react";
import AdminDoctor from "./doctors/AdminDoctor";
import AdminNurses from "./nurses/AdminNurses";
import IndoorPatient from "./indoorPatient/IndoorPatient";
import OutdoorPatient from "./outdoorPatient/OutdoorPatient";

const AdminPage = () => {
    const [activeContent, setActiveContent] = useState("Doctors");

  const handleClick = (content) => {
    setActiveContent(content);
  };
  return (
    <div>
      <div className="main-container">
        <div className="multiple-btn">
        <div className="side-btn">
          <button onClick={() => handleClick("Doctors")}>Doctors</button>
        </div>
        <div className="side-btn">
          <button onClick={() => handleClick("Nurses")}>Nurses</button>
        </div>
        <div className="side-btn">
          <button onClick={() => handleClick("Indoor Patients")}>Indoor Patients</button>
        </div>
        <div className="side-btn">
          <button onClick={() => handleClick("Out Door Patients")}>Out Door Patients</button>
        </div>
        </div>
        <div className="content-container">
        {activeContent === "Doctors" && (
          <AdminDoctor/>
        )}
        {activeContent === "Nurses" && (
         <AdminNurses/>
        )}
        {activeContent === "Indoor Patients" && (
          <IndoorPatient/>
        )}
        {activeContent === "Out Door Patients" && (
          <OutdoorPatient/>
        )}
        </div>
      </div>
      <br />
      <br />
    </div>
  )
}

export default AdminPage