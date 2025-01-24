import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    isbn: "",
    category: "",
    quantity: "",
    available: "",
    price: "",
  });

  const categories = ["Fiction", "Non-Fiction", "Science", "History", "Autobiography"]; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.isbn.trim() ||
      !formData.category.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/create",
        formData,
        { withCredentials: true }
      );

      console.log(response.data);
      if (response.data.success) {
        toast.success("Book created successfully!");
        setFormData({
          name: "",
          isbn: "",
          category: "",
          quantity: "",
          available: "",
          price: "",
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create book.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="create-book-container">
        <div className="create-book-card">
          <h3>Create Book</h3>

          {/* create form for book */}
          <form className="book-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Book Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter book name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Enter ISBN"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="available">Available</label>
              <input
                type="number"
                id="available"
                name="available"
                value={formData.available}
                onChange={handleChange}
                placeholder="Enter available stock"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
