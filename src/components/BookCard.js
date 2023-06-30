function BookCard({ title, description, author, genre, availability }) {
  return (
    <div className="BookCard card">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <h4 className="card-subtitle mb-2 text-muted">Description:</h4>
        <p className="card-text">{description}</p>
        <h4 className="card-subtitle mb-2 text-muted">Author:</h4>
        <p className="card-text">{author}</p>
        <h4 className="card-subtitle mb-2 text-muted">Genre:</h4>
        <p className="card-text">{genre}</p>
        <h4 className="card-subtitle mb-2 text-muted">Availability:</h4>
        <p className="card-text">{availability}</p>
      </div>
    </div>
  );
}

export default BookCard;