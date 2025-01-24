import axios from "axios";
import { useEffect, useState } from "react";

const IndoorPatient = () => {
  const [indoorPatient, setIndoorPatient] = useState([]);
 

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/indoor-patient/all-indoor-patient", {
          withCredentials: true, 
        });
        
        setIndoorPatient(response.data.indoorPatient); 
        
      } catch (error) {
        console.error("Error fetching doctors:", error);
        
      }
    };
    fetchDoctors();
  }, []); 
  return (
    <div>
      <div>
        <h2 style={{ marginBottom: "10px" }}>
          Available Indoor Patient <span>{indoorPatient.length}</span>
        </h2>
        <div className="doctor-grid-container">
          {indoorPatient.map((patient, index) => (
            <div className="doctor-card card-1" key={index}>
              <div className="doctor-img">
                <img src={`http://localhost:8000/uploads/${patient.image}`} alt={patient.name} />
              </div>
              <h2 style={{ marginTop: "10px" }}>{patient.patientName}</h2>
              <div className="doctor-info">
                <div className="dep-name">
                  <span>{patient.department}</span>
                  <h4>{patient.roomNumber}</h4>
                </div>
                <div className="timing">
                  <span>{patient.admissionDate}</span>
                  <h4>{patient.dischargeDate}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndoorPatient;
