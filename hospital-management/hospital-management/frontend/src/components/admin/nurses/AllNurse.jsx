import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllNurse = () => {
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

  const handleDelete = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/nurse/delete-nurse/${id}`, {
        withCredentials: true,
      });
      
      if (response.data && response.data.message) {
        toast.success(response.data.message);  
        setNurses((prevNurses) =>
          prevNurses.filter((nurse) => nurse._id !== id)
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
          Nurse Table
        </h1>
        <div className="admin-doctor-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Department</th>
                <th>Job Title</th>
                <th>Timing</th>
                <th>Days</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {nurses.map((nurse, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`http://localhost:8000/uploads/${nurse.image}`}
                      alt={nurse.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{nurse.name}</td>
                  <td>{nurse.department}</td>
                  <td>{nurse.jobTitle}</td>
                  <td>{nurse.timing}</td>
                  <td>{nurse.days}</td>
                  <td>
                    <button
                    onClick={()=>handleDelete(nurse._id)}
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
  );
};

export default AllNurse;
