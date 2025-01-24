import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateIndoorPatient = () => {
    const [indoorData, setIndoorData] = useState({
        image: "",
        patientName: "",
        roomNumber: "",
        department: "",
        admissionDate: "",
        dischargeDate: "",
      });

  const [imagePreview, setImagePreview] = useState(null);

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setIndoorData({
          ...indoorData,
          [name]: value,
        });
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImagePreview(URL.createObjectURL(file));
          setIndoorData({
            ...indoorData,
            image: file,
          });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("image", indoorData.image);
        formData.append("patientName", indoorData.patientName);
        formData.append("roomNumber", indoorData.roomNumber);
        formData.append("department", indoorData.department);
        formData.append("admissionDate", indoorData.admissionDate);
        formData.append("dischargeDate", indoorData.dischargeDate);
    
        try {
          const response = await axios.post(
            "http://localhost:8000/api/v1/indoor-patient/create-indoor-patient", 
            formData,
            {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          if (response.data && response.data.message) {
            toast.success(response.data.message);  
          } else {
            toast.error("Something went wrong!"); 
          }
          setIndoorData({
            image: "",
            patientName: "",
            department: "",
            roomNumber: "",
            admissionDate: "",
            dischargeDate: "",
          });
          setImagePreview(null);
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error(error.response?.data?.message || "Something went wrong!");
        }
      };
  return (
    <div>
    <div className="create-doctor-form">
      <h2>Create New Indoor Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientName">Name</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={indoorData.patientName}
            onChange={handleChange}
            placeholder="Enter Patient name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={indoorData.roomNumber}
            onChange={handleChange}
            placeholder="Enter Room Number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={indoorData.department}
            onChange={handleChange}
            placeholder="Enter Department"
          />
        </div>
        <div className="form-group">
          <label htmlFor="admissionDate">Admission Date</label>
          <input
            type="text"
            id="admissionDate"
            name="admissionDate"
            value={indoorData.admissionDate}
            onChange={handleChange}
            placeholder="Enter Admission Date"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dischargeDate">Discharge Date</label>
          <input
            type="text"
            id="dischargeDate"
            name="dischargeDate"
            value={indoorData.dischargeDate}
            onChange={handleChange}
            placeholder="Enter Discharge Date"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Profile Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        {imagePreview && (
            <div className="image-preview">
              <h4>Image Preview:</h4>
              <img
                src={imagePreview}
                alt="Profile Preview"
                style={{ width: "150px", height: "auto", borderRadius: "10px" }}
              />
            </div>
          )}
        <button type="submit">Submit</button>
      </form>
    </div>
    <br />
  </div>
  )
}

export default CreateIndoorPatient