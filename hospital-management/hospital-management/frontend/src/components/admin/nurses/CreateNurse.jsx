import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateNurse = () => {
  const [nurseData, setNurseData] = useState({
    image: "",
    name: "",
    department: "",
    jobTitle: "",
    timing: "",
    days: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNurseData({
      ...nurseData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setNurseData({
        ...nurseData,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", nurseData.image);
    formData.append("name", nurseData.name);
    formData.append("department", nurseData.department);
    formData.append("jobTitle", nurseData.jobTitle);
    formData.append("timing", nurseData.timing);
    formData.append("days", nurseData.days);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/nurse/create-nurse",
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
      setNurseData({
        image: "",
        name: "",
        department: "",
        jobTitle: "",
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
        <h2>Create New Nurse</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={nurseData.name}
              onChange={handleChange}
              placeholder="Enter Nurse's name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={nurseData.department}
              onChange={handleChange}
              placeholder="Enter department"
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={nurseData.jobTitle}
              onChange={handleChange}
              placeholder="Enter Job Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="timing">Working Hours</label>
            <input
              type="text"
              id="timing"
              name="timing"
              value={nurseData.timing}
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
              value={nurseData.days}
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

export default CreateNurse;
