import { useState } from "react";
import eventsService from "../services/events.service";
import axios from "axios";

function AddEvent(props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const token = localStorage.getItem("authToken");

  const handleFileUpload = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, uploadData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setImageUrl(response.data.fileUrl);
      });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, location, address, description, time, date, imageUrl};

    // axios
    //   .post(
    //     `${API_URL}/api/projects`,
    //     requestBody,
    //     { headers: { Authorization: `Bearer ${storedToken}` } }
    //   )

    eventsService.createEvent(requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        setLocation("");
        setAddress("");
        setDescription("");
        setTime("");
        setDate("");
        setImageUrl("");
        props.refreshEvent();
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddEvent">
      <h3>Add Event</h3>

      <form onSubmit={handleSubmit}>
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
          type="text"
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

<div className="mb-3">
          <input
            type="file"
            name="imageUrl"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>

        

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddEvent;