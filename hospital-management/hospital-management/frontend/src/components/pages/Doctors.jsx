import axios from "axios";
import { useEffect, useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/doctor/all-doctor",
          {
            withCredentials: true,
          }
        );
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);
  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>
        Available {"Doctor's"} <span>{doctors.length}</span>
      </h2>
      <div className="doctor-grid-container">
        {doctors.map((doctor, index) => (
          <div className="doctor-card card-1" key={index}>
            <div className="doctor-img">
              <img src={`http://localhost:8000/uploads/${doctor.image}`} alt={doctor.name} />
            </div>
            <h2 style={{ marginTop: "10px" }}>{doctor.name}</h2>
            <div className="doctor-info">
              <div className="dep-name">
                <span>{doctor.department}</span>
                <h4>{doctor.qualification}</h4>
              </div>
              <div className="timing">
                <span>{doctor.days}</span>
                <h4>{doctor.timing}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
