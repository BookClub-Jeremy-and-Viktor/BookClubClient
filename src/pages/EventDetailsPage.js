import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddBook from "../components/AddBook";
import BookCard from "../components/BookCard";
import "./EventDetailsPage.css"; // Import the CSS file

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
      <div className="row">
        <div className="col-md-6 custom-col"> 
          {event && (
            <>
              <h1>{event.title}</h1>
              <p>Location: {event.location}</p>
              <p>Address: {event.address}</p>
              <p>Description: {event.description}</p>
              <p>Time: {event.time}</p>
              <p>Date: {event.date}</p>
            </>
          )}

          <Link to="/events">
            <button className="btn btn-primary">Back to Events</button>
          </Link>

          <Link to={`/events/edit/${eventId}`}>
            <button className="btn btn-primary">Edit Event</button>
          </Link>

          {event &&
            event.books.map((book) => <BookCard key={book._id} {...book} />)}
        </div>

        <div className="col-md-6">
          <AddBook refreshEvent={getEvent} eventId={eventId} />
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
