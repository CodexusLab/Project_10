import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: initialPolicy } = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    isbn: "",
    category: "",
    quantity: "",
    available: "",
    price: "",
  });

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Autobiography",
  ];

  useEffect(() => {
    if (initialPolicy) {
      setFormData(initialPolicy);
    } else {
      const fetchBook = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/admin/single-book/${id}`,
            {
              withCredentials: true,
            }
          );

          if (response.data.success) {
            setFormData(response.data.book);
          } else {
            toast.error("Failed to fetch book data.");
          }
        } catch (error) {
          console.log(error);
          toast.error("Error fetching book data.");
        }
      };
      fetchBook();
    }
  }, [id]);

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
      const response = await axios.put(
        `http://localhost:8000/api/v1/admin/update-book/${id}`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Book updated successfully!");
        setTimeout(()=>{
          navigate(`/admin/dashboard`);
        },1000)
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update book.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="create-book-container">
        <div className="create-book-card">
          <h3>Edit Book</h3>

          {/* Edit form for book */}
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

export default EditBook;
