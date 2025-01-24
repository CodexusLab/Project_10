import { useState } from "react";
import Doctors from "./Doctors";
import Nurses from "./Nurses";
import IndoorPatient from "./IndoorPatient";
import OutDoorPatient from "./OutDoorPatient";

const Home = () => {
    const [activeContent, setActiveContent] = useState("Doctors");

  const handleClick = (content) => {
    setActiveContent(content);
  };
  return (
    <div>
      <div className="main-container">
        <div className="multiple-btn">
        <div className="side-btn">
          <button>Home</button>
        </div>
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
          <Doctors/>
        )}
        {activeContent === "Nurses" && (
         <Nurses/>
        )}
        {activeContent === "Indoor Patients" && (
          <IndoorPatient/>
        )}
        {activeContent === "Out Door Patients" && (
          <OutDoorPatient/>
        )}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Home;
