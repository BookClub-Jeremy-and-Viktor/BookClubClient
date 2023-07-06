import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddEvent from "../components/AddEvent";
import "./BookDetailsPage.css"; // Import the CSS file

function BookDetailsPage(props) {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();

  const getBook = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneBook = response.data;
        setBook(oneBook);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 custom-col"> {/* Add the custom class */}
          {book && (
            <>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Description: {book.description}</p>
              <p>Genre: {book.genre}</p>
              <p>Availability: {book.availability}</p>
              <p>Comments: {book.comments}</p>
            </>
          )}

          <Link to="/books">
            <button className="btn btn-primary">Back to Books</button>
          </Link>

          <Link to={`/books/edit/${bookId}`}>
            <button className="btn btn-primary">Edit Book</button>
          </Link>
        </div>

        <div className="col-md-6">
          <AddEvent refreshBook={getBook} bookId={bookId} />
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;
