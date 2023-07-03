import { Link } from "react-router-dom";

function BookCard({
  title,
  author,
  description,
  genre,
  availability,
  comments,
  _id,
}) {
  return (
    <div className="BookCard card">
      <Link to={`/books/${_id}`}>
        <h3>{title}</h3>
      </Link>

      <img
        class="card-img-top"
        src="../images/bibliothek.png"
        alt="bibliothek"
      />
      <div className="card-body">
        <h4 className="card-subtitle mb-2 text-muted">Author:</h4>
        <p className="card-text">{author}</p>
        <h4 className="card-subtitle mb-2 text-muted">Description:</h4>
        <p className="card-text">{description}</p>
        <h4 className="card-subtitle mb-2 text-muted">Genre:</h4>
        <p className="card-text">{genre}</p>
        <h4 className="card-subtitle mb-2 text-muted">Availability:</h4>
        <p className="card-text">{availability}</p>
        <h4 className="card-subtitle mb-2 text-muted">Comments:</h4>
        <p className="card-text">{comments}</p>
      </div>
    </div>
  );
}

export default BookCard;
