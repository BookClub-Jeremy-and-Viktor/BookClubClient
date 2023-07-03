import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = "http://localhost:5005";

function EditBookPage(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [availability, setAvailability] = useState("");
  const [comments, setComments] = useState("");
  

  const navigate =  useNavigate();
  const { bookId } = useParams();
  
  
  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // Send the token through the request "Authorization" Headers 
    axios
      .get(
        `${API_URL}/api/books/${bookId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }    
      )
      .then((response) => {
        const oneBook = response.data;
        setTitle(oneBook.title);
        setAuthor(oneBook.author);
        setDescription(oneBook.description);
        setGenre(oneBook.genre);        
        setAvailability(oneBook.availability);
        setComments(oneBook.comments);
      })
      .catch((error) => console.log(error));
    
  }, [bookId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, author, description, genre, availability, comments};
  
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');  

    // Send the token through the request "Authorization" Headers   
    axios
      .put(
        `${API_URL}/api/books/${bookId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }              
      )
      .then((response) => {
        navigate(`/books/${bookId}`)
      });
  };
  
  
  const deleteBook = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');      
    
    // Send the token through the request "Authorization" Headers   
    axios
      .delete(
        `${API_URL}/api/books/${bookId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
      .then(() => navigate("/books"))
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditBookPage">
      <h3>Edit the Book</h3>

      <form onSubmit={handleFormSubmit}>
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
        <input
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

        <label>Availability:</label>
        <input
          type="text"
          name="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />

        <label>Comments:</label>
        <input
          type="text"
          name="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        
        <button type="submit">Update Book</button>
      </form>

      <button onClick={deleteBook}>Delete Book</button>
    </div>
  );
}

export default EditBookPage;