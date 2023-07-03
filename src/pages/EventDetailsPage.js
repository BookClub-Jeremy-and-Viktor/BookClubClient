import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddBook from "../components/AddBook";

import BookCard from "../components/BookCard";

const API_URL = "http://localhost:5005";


function EventDetailsPage (props) {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  
  
  const getEvent = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/events/${eventId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getEvent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  
  return (
    <div className="EventDetails">
      {event && (
        <>
          <h1>{event.title}</h1>
          <p>{event.location}</p>
          <p>{event.address}</p>
          <p>{event.description}</p>
          <p>{event.time}</p>
          <p>{event.date}</p>
          <p>{event.comments}</p>
          <p>{event.books}</p>
        </>
      )}

      
      <AddBook refreshEvent={getEvent} eventId={eventId} />          

      { event && event.books.map((book) => <BookCard key={book._id} {...book} /> )} 

      <Link to="/events">
        <button>Back to Events</button>
      </Link>
          
      <Link to={`/events/edit/${eventId}`}>
        <button>Edit Event</button>
      </Link>
      
    </div>
  );
}

export default EventDetailsPage;