import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import AddEvent from "../components/AddEvent";

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
    <div className="container">
      <div className="row">
      <AddEvent refreshEvent={getAllEvents}/>
        {events.map((event, index) => (
          <div className="col-12 col-sm-6 col-md-4 mb-3" key={event._id}>
            <div className="w-100">
              <EventCard {...event} />
            </div>
          </div>
          
        ))}

      </div>
    </div>
  );
}

export default EventListPage;
