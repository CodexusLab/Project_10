import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"

const AllDoctors = () => {
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

  const handleDelete = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/doctor/delete-doctor/${id}`, {
        withCredentials: true,
      });
      
      if (response.data && response.data.message) {
        toast.success(response.data.message);  
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor._id !== id)
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
        <h1
          style={{
            fontSize: "24px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Doctor Table
        </h1>
        <div className="admin-doctor-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Department</th>
                <th>Qualification</th>
                <th>Timing</th>
                <th>Days</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={`http://localhost:8000/uploads/${doctor.image}`}
                        alt={doctor.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </td>
                    <td>{doctor.name}</td>
                    <td>{doctor.department}</td>
                    <td>{doctor.qualification}</td>
                    <td>{doctor.timing}</td>
                    <td>{doctor.days}</td>
                    <td>
                      <button
                        onClick={()=> handleDelete(doctor._id)}
                        className="delete-btn"
                        style={{ backgroundColor: "red" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default AllDoctors;
