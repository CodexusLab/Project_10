import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllIndoorPatient = () => {
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

  const handleDelete = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/indoor-patient/delete-indoor-patient/${id}`, {
        withCredentials: true,
      });
      
      if (response.data && response.data.message) {
        toast.success(response.data.message);  
        setIndoorPatient((prevPatient) =>
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
      <h1 style={{fontSize:"24px",textAlign:"center",marginBottom:"10px"}}>Indoor Patient Table</h1>
      <div className="admin-doctor-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Patient Name</th>
              <th>Room Number</th>
              <th>Department</th>
              <th>Admission Date</th>
              <th>Discharge Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {indoorPatient.map((patient, index) => (
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
                <td>{patient.roomNumber}</td>
                <td>{patient.department}</td>
                <td>{patient.admissionDate}</td>
                <td>{patient.dischargeDate}</td>
                <td>
                  <button
                  onClick={()=> handleDelete(patient._id)}
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

export default AllIndoorPatient