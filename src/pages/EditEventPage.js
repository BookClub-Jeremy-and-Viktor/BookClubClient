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
  const [imageUrl, setImageUrl] = useState("");
  

  const navigate =  useNavigate();
  const { eventId } = useParams();
  const storedToken = localStorage.getItem('authToken');
  
  useEffect(() => {
    // Get the token from the localStorage
    
    
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
        setImageUrl(oneEvent.imageUrl);
        
      })
      .catch((error) => console.log(error));
    
  }, [eventId]);

  const handleFileUpload = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setImageUrl(response.data.fileUrl);
      });
  };
  
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, location, address, description, time, date, imageUrl };
  
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

<label>Image:</label>
        <input
          type="file"
          name="imageUrl"
          onChange={(e) => handleFileUpload(e)}
        />

      <button type="submit" className="btn btn-secondary">Update Event</button>
      </form>

      <button onClick={deleteEvent} className="btn btn-danger">Delete Event</button>
    </div>
  );
}

export default EditEventPage;