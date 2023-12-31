import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import AddBook from "../components/AddBook";

function BookListPage() {
  const [books, setBooks] = useState([]);

  const getAllBooks = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/books`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    
    <div className="container">
      <div className="row">
      <h4>To edit or delete a book, just click the books title</h4>
        <AddBook refreshBooks={getAllBooks}/>
        {books.map((book, index) => (
          <div className="col-12 col-sm-6 col-md-4 mb-3" key={book._id}>
            <div className="w-100">
              <BookCard {...book} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookListPage;