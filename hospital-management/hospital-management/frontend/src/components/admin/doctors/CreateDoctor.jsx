import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"

const CreateDoctor = () => {
  const [doctorData, setDoctorData] = useState({
    image: "",
    name: "",
    department: "",
    qualification: "",
    timing: "",
    days: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setDoctorData({
        ...doctorData,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", doctorData.image);
    formData.append("name", doctorData.name);
    formData.append("department", doctorData.department);
    formData.append("qualification", doctorData.qualification);
    formData.append("timing", doctorData.timing);
    formData.append("days", doctorData.days);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/doctor/create-doctor", 
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
      setDoctorData({
        image: "",
        name: "",
        department: "",
        qualification: "",
        timing: "",
        days: "",
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
        <h2>Create New Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={doctorData.name}
              onChange={handleChange}
              placeholder="Enter doctor's name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={doctorData.department}
              onChange={handleChange}
              placeholder="Enter department"
            />
          </div>
          <div className="form-group">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={doctorData.qualification}
              onChange={handleChange}
              placeholder="Enter qualifications"
            />
          </div>
          <div className="form-group">
            <label htmlFor="timing">Working Hours</label>
            <input
              type="text"
              id="timing"
              name="timing"
              value={doctorData.timing}
              onChange={handleChange}
              placeholder="Enter working hours"
            />
          </div>
          <div className="form-group">
            <label htmlFor="days">Available Days</label>
            <input
              type="text"
              id="days"
              name="days"
              value={doctorData.days}
              onChange={handleChange}
              placeholder="Enter available days"
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

export default CreateDoctor;
