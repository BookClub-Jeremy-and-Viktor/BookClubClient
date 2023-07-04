import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

// const API_URL = "http://localhost:5005";

function EditEventPage(props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  

  const navigate =  useNavigate();
  const { eventId } = useParams();
  
  
  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // Send the token through the request "Authorization" Headers 
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/events/${eventId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }    
      )
      .then((response) => {
        const oneEvent = response.data;
        setTitle(oneEvent.title);
        setLocation(oneEvent.location);
        setAddress(oneEvent.address);
        setDescription(oneEvent.description);
        setTime(oneEvent.time);
        setDate(oneEvent.description);
        
      })
      .catch((error) => console.log(error));
    
  }, [eventId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, location, address, description, time, date, };
  
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');  

    // Send the token through the request "Authorization" Headers   
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/events/${eventId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }              
      )
      .then((response) => {
        navigate(`/events/${eventId}`)
      });
  };
  
  
  const deleteEvent = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');      
    
    // Send the token through the request "Authorization" Headers   
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/api/events/${eventId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
      .then(() => navigate("/events"))
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditEventPage">
      <h3>Edit the event</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

      <button type="submit">Update Event</button>
      </form>

      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );
}

export default EditEventPage;