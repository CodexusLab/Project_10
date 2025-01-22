import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [currentPageBooks, setCurrentPageBooks] = useState(1); // Current page for books
  const [currentPageBorrowed, setCurrentPageBorrowed] = useState(1); // Current page for borrowed books
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/all-book",
          { withCredentials: true }
        );
        const data = await response.data;
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/auth/user/borrowed-book",
          { withCredentials: true }
        );
        const data = await response.data;
        setBorrowedBooks(data.borrowedBooks);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  // Pagination logic for books
  const totalPagesBooks = Math.ceil(books.length / itemsPerPage);
  const startIndexBooks = (currentPageBooks - 1) * itemsPerPage;
  const endIndexBooks = startIndexBooks + itemsPerPage;
  const currentBooks = books.slice(startIndexBooks, endIndexBooks);

  // Pagination logic for borrowed books
  const totalPagesBorrowed = Math.ceil(borrowedBooks.length / itemsPerPage);
  const startIndexBorrowed = (currentPageBorrowed - 1) * itemsPerPage;
  const endIndexBorrowed = startIndexBorrowed + itemsPerPage;
  const currentBorrowedBooks = borrowedBooks.slice(startIndexBorrowed, endIndexBorrowed);

  const handlePageChangeBooks = (pageNumber) => {
    setCurrentPageBooks(pageNumber);
  };

  const handlePageChangeBorrowed = (pageNumber) => {
    setCurrentPageBorrowed(pageNumber);
  };

  return (
    <div>
      <div className="table-container">
        <h1 style={{ marginBottom: "10px" }}>Book List</h1>
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
                    <Link to={`/books/${book._id}`} state={book}>
                      <button className="view-btn">View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          {[...Array(totalPagesBooks)].map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`pagination-btn ${
                pageIndex + 1 === currentPageBooks ? "active" : ""
              }`}
              onClick={() => handlePageChangeBooks(pageIndex + 1)}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      </div>

      <br />
      <br />

      <div className="table-container">
        <h1 style={{ marginBottom: "10px" }}>Borrowed Books</h1>
        <div className="book-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBorrowedBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.name}</td>
                  <td>{book.isbn}</td>
                  <td>{book.category}</td>
                  <td>{book.price}</td>
                  <td>
                    <Link to={`/books/${book._id}`} state={book}>
                      <button className="view-btn">View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          {[...Array(totalPagesBorrowed)].map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`pagination-btn ${
                pageIndex + 1 === currentPageBorrowed ? "active" : ""
              }`}
              onClick={() => handlePageChangeBorrowed(pageIndex + 1)}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Home;
