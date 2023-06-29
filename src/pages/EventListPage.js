import { useState, useEffect } from "react";
import axios from "axios";
import AddEvent from "../components/AddEvent";
import EventCard from "../components/EventCard";

const API_URL = "http://localhost:5005";

function EventListPage() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/events`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="EventListPage">
      <AddEvent refreshEvents={getAllEvents} />

      {events.map((event) => (
        <EventCard key={event._id} {...event} />
      ))}
    </div>
  );
}

export default EventListPage;
