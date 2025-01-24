import axios from "axios";
import { useEffect, useState } from "react";

const OutDoorPatient = () => {
  const [outdoorPatient, setOutdoorPatient] = useState([]);
 

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/outdoor-patient/all-outdoor-patient", {
          withCredentials: true, 
        });
        setOutdoorPatient(response.data.outdoorPatient); 
        
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
        Available Outdoor Patient <span>{outdoorPatient.length}</span>
      </h2>
      <div className="doctor-grid-container">
        {outdoorPatient.map((patient, index) => (
          <div className="doctor-card card-1" key={index}>
            <div className="doctor-img">
              <img src={`http://localhost:8000/uploads/${patient.image}`} alt={patient.patientName} />
            </div>
            <h2 style={{ marginTop: "10px" }}>{patient.patientName}</h2>
            <div className="doctor-info">
              <div className="dep-name">
                <span>{patient.department}</span>
                <h4>{patient.appointmentDate}</h4>
              </div>
              <div className="timing">
                <span>{patient.doctorAssigned}</span>
                <h4>{patient.status}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default OutDoorPatient