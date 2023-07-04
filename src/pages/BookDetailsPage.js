import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddEvent from "../components/AddEvent";

//import EventCard from "../components/EventCard";

// const API_URL = "http://localhost:5005";


function BookDetailsPage (props) {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  
  
  const getBook = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/books/${bookId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneBook = response.data;
        setBook(oneBook);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getBook();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  
  return (
    <div className="BookDetails">
      {book && (
        <>
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Description: {book.description}</p>
          <p>Genre: {book.genre}</p>
          <p>Availability: {book.availability}</p>
          <p>Comments: {book.comments}</p>
        </>
      )}

      <Link to="/books">
        <button>Back to Books</button>
      </Link>
          
      <Link to={`/books/edit/${bookId}`}>
        <button>Edit Book</button>
      </Link>

      
      <AddEvent refreshBook={getBook} bookId={bookId} />          

      {/* book && book.event.map((event) => <EventCard key={event._id} {...event} /> )*/} 
      
    </div>
  );
}

export default BookDetailsPage;