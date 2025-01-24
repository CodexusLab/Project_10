import axios from "axios";
import { useEffect, useState } from "react";

const Nurses = () => {
  const [nurses, setNurses] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/nurse/all-nurse",
          {
            withCredentials: true,
          }
        );
        setNurses(response.data.nurses);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);
  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>
        Available {"Nurses's"} <span>{nurses.length}</span>
      </h2>
      <div className="doctor-grid-container">
        {nurses.map((nurse, index) => (
          <div className="doctor-card card-1" key={index}>
            <div className="doctor-img">
              <img src={`http://localhost:8000/uploads/${nurse.image}`} alt={nurse.name} />
            </div>
            <h2 style={{ marginTop: "10px" }}>{nurse.name}</h2>
            <div className="doctor-info">
              <div className="dep-name">
                <span>{nurse.department}</span>
                <h4>{nurse.jobTitle}</h4>
              </div>
              <div className="timing">
                <span>{nurse.days}</span>
                <h4>{nurse.timing}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Nurses