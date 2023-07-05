import { useState } from "react";
import booksService from "../services/books.service";
import axios from "axios";



function AddBook(props) {

  console.log(props)
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [availability, setAvailability] = useState("");
  const [comments, setComments] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const token = localStorage.getItem("authToken");

  const handleFileUpload = (e) => {
    e.preventDefault();
    console.log('my image', e.target.files[0])
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post("http://localhost:5005/api/upload", uploadData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('cloudy url', response.data.imageUrl)
        setImageUrl(response.data.imageUrl);
      });
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { eventId } = props;
    const requestBody = { title, author, description, genre, availability, comments, eventId, imageUrl };

    booksService
      .createBook(requestBody)
      .then((response) => {
        setTitle("");
        setAuthor("")
        setDescription("");
        setGenre("");
        setAvailability("");
        setComments("");
        setImageUrl("");
        props.refreshBooks();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddBook">
      <h3>Add New Book</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
         
         <label>Author:</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <div className="mb-3">
          <input
            type="file"
            name="imageUrl"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>

        <label>Availability:</label>
        <input
          type="text"
          name="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />

        <label>Comments:</label>
        <textarea
          type="text"
          name="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />

        
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
