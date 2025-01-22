import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminTable = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  console.log(books);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios(
          "http://localhost:8000/api/v1/admin/all-book",
          { withCredentials: true }
        );
        const data = await response.data;
        console.log(data);
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/admin/delete-book/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting book");
    }
  };

  return (
    <div>
      <div className="table-container">
        <div className="add-page">
          <h1 style={{ marginBottom: "10px" }}>Book List</h1>
          <Link to={"/admin/dashboard/create-book"}>
            <button className="add-btn">Add Book</button>
          </Link>
        </div>
        <div className="book-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.name}</td>
                  <td>{book.isbn}</td>
                  <td>{book.category}</td>
                  <td>{book.quantity}</td>
                  <td>{book.available}</td>
                  <td>{book.price}</td>
                  <td>
                    <div
                      className="multiple-btn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <Link to={"/books"}>
                        <button className="view-btn">View</button>
                      </Link>
                      <Link to={`/edit-book/${book._id}`} state={book}>
                        <button className="view-btn">Edit</button>
                      </Link>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="view-btn"
                        style={{ backgroundColor: "purple" }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`pagination-btn ${
                pageIndex + 1 === currentPage ? "active" : ""
              }`}
              onClick={() => handlePageChange(pageIndex + 1)}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default AdminTable;
