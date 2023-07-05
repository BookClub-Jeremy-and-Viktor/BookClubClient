import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddBook from "../components/AddBook";
import BookCard from "../components/BookCard";

function EventDetailsPage(props) {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  const getEvent = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {event && (
        <>
          <h1>{event.title}</h1>
          <p>{event.location}</p>
          <p>{event.address}</p>
          <p>{event.description}</p>
          <p>{event.time}</p>
          <p>{event.date}</p>
          <p>{event.comments}</p>
        </>
      )}

      <Link to="/events">
        <button className="btn btn-primary">Back to Events</button>
      </Link>

      <Link to={`/events/edit/${eventId}`}>
        <button className="btn btn-primary">Edit Event</button>
      </Link>

      <AddBook refreshEvent={getEvent} eventId={eventId} />

      {event &&
        event.books.map((book) => <BookCard key={book._id} {...book} />)}
    </div>
  );
}

export default EventDetailsPage;
