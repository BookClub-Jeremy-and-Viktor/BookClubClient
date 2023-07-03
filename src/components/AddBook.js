import { useState } from "react";
import booksService from "../services/books.service";

function AddBook(props) {

  console.log(props)
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [availability, setAvailability] = useState("");
  const [comments, setComments] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const { eventId } = props;
    const requestBody = { title, author, description, genre, availability, comments, eventId };

    booksService
      .createBook(requestBody)
      .then((response) => {
        setTitle("");
        setAuthor("")
        setDescription("");
        setGenre("");
        setAvailability("");
        setComments("");
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

        
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
