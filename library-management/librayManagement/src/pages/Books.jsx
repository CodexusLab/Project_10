import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Books = () => {
  const [formData, setFormData] = useState({
    name: "",
    isbn: "",
    category: "",
    quantity: "",
    available: "",
    price: "",
  });
  const [isBorrowed, setIsBorrowed] = useState(false);

  const { bookId } = useParams();
  const navigate = useNavigate();
  const { state: initialPolicy } = useLocation();

  const handleBorrow = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/auth/borrow/${bookId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Book borrowed successfully!");
        setIsBorrowed(true);
        setFormData((prevState) => ({
          ...prevState,
          available: prevState.available - 1,
        }));
      } else {
        toast.error(response.data.message || "Failed to borrow the book.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error borrowing the book.");
    }
  };

  const handleReturn = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/auth/return/${bookId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Book returned successfully!")
        setFormData((prevState) => ({
          ...prevState,
          available: prevState.available - 1,
        }));
      } else {
        toast.error(response.data.message || "Failed to borrow the book.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error borrowing the book.");
    }
  };

  useEffect(() => {
    if (initialPolicy) {
      setFormData(initialPolicy);
    } else {
      const fetchBook = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/admin/single-book/${bookId}`,
            {
              withCredentials: true,
            }
          );
          console.log(response.data);

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
  }, [bookId, initialPolicy]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="book-container">
        <div className="book-card">
          <h1>Book Details</h1>
          <div className="book-details">
            <h1>Name</h1>
            <span>{formData.name || "Loading..."}</span>
          </div>
          <hr />
          <div className="book-details">
            <h1>ISBN</h1>
            <span>{formData.isbn || "Loading..."}</span>
          </div>
          <hr />
          <div className="book-details">
            <h1>Category</h1>
            <span>{formData.category || "Loading..."}</span>
          </div>
          <hr />
          <div className="book-details">
            <h1>Quantity</h1>
            <span>{formData.quantity || "Loading..."}</span>
          </div>
          <hr />
          <div className="book-details">
            <h1>Available</h1>
            <span>{formData.available || "Loading..."}</span>
          </div>
          <hr />
          <div className="book-details">
            <h1>Price</h1>
            <span>{formData.price ? `$${formData.price}` : "Loading..."}</span>
          </div>
          <hr />
          <div className="btn-details">
            <button
              className="borrow-btn"
              onClick={handleBorrow}
              disabled={isBorrowed || formData.available <= 0}
            >
              Borrow
            </button>
            <button
              // disabled={true}
              className="borrow-btn"
              onClick={handleReturn}
            >
              Return
            </button>
            <button className="go-back-btn" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
