import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateOutdoorPatient = () => {
  const [outdoorData, setOutdoorData] = useState({
    image: "",
    patientName: "",
    appointmentDate: "",
    department: "",
    doctorAssigned: "",
    status: "",
  });

  const [imagePreview, setImagePreview] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutdoorData({
      ...outdoorData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setOutdoorData({
        ...outdoorData,
        image: file,
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", outdoorData.image);
    formData.append("patientName", outdoorData.patientName);
    formData.append("appointmentDate", outdoorData.appointmentDate);
    formData.append("department", outdoorData.department);
    formData.append("doctorAssigned", outdoorData.doctorAssigned);
    formData.append("status", outdoorData.status);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/outdoor-patient/create-outdoor-patient", 
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
      setOutdoorData({
        image: "",
        patientName: "",
        department: "",
        appointmentDate: "",
        doctorAssigned: "",
        status: "",
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
        <h2>Create New OutDoor Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientName">Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={outdoorData.patientName}
              onChange={handleChange}
              placeholder="Enter Patient name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input
              type="text"
              id="appointmentDate"
              name="appointmentDate"
              value={outdoorData.appointmentDate}
              onChange={handleChange}
              placeholder="Enter Appointment Date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={outdoorData.department}
              onChange={handleChange}
              placeholder="Enter Department"
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorAssigned">Doctor Assigned</label>
            <input
              type="text"
              id="doctorAssigned"
              name="doctorAssigned"
              value={outdoorData.doctorAssigned}
              onChange={handleChange}
              placeholder="Enter Doctor Assigned"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              value={outdoorData.status}
              onChange={handleChange}
              placeholder="Enter Status"
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
  );
};

export default CreateOutdoorPatient;
