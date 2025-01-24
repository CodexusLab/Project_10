import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllOutdoorPatient = () => {
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

  const handleDelete = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/outdoor-patient/delete-outdoor-patient/${id}`, {
        withCredentials: true,
      });
      
      if (response.data && response.data.message) {
        toast.success(response.data.message);  
        setOutdoorPatient((prevPatient) =>
          prevPatient.filter((patient) => patient._id !== id)
        );
      } else {
        toast.error("Something went wrong!");
      }
  
      console.log("Delete Response:", response.data);
    } catch (error) {
      console.error("Error deleting patient:", error);
      
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage); 
    }
  };

  return (
    <div>
    <div className="admin-table-container">
      <h1 style={{fontSize:"24px",textAlign:"center",marginBottom:"10px"}}>Outdoor Patient Table</h1>
      <div className="admin-doctor-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Patient Name</th>
              <th>Appointment Date</th>
              <th>Department</th>
              <th>Doctor Assigned</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {outdoorPatient.map((patient, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`http://localhost:8000/uploads/${patient.image}`}
                    alt={patient.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>{patient.patientName}</td>
                <td>{patient.appointmentDate}</td>
                <td>{patient.department}</td>
                <td>{patient.doctorAssigned}</td>
                <td>{patient.status}</td>
                <td>
                  <button
                  onClick={() => handleDelete(patient._id)}
                    className="delete-btn"
                    style={{ backgroundColor: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <br />
    <br />
  </div>
  )
}

export default AllOutdoorPatient