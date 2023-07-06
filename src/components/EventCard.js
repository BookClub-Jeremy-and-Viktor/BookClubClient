import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function EventCard ( { title, location, address, description, time, date, _id, imageUrl } ) {
  
  return (
    <div className="EventCard card">
      <Link to={`/events/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <img
        class="card-img-top"
        src={imageUrl}
        alt="bibliothek"
      />
      <div className="card-body">
        <h4 className="card-subtitle mb-2 text-muted">Location:</h4>
        <p className="card-text shadow p-3 mb-5 bg-white rounded">{location}</p>
        <h4 className="card-subtitle mb-2 text-muted">Address:</h4>
        <p className="card-text shadow p-3 mb-5 bg-white rounded">{address}</p>
        <h4 className="card-subtitle mb-2 text-muted">Description:</h4>
        <p className="card-text">{description}</p>
        <h4 className="card-subtitle mb-2 text-muted">Time:</h4>
        <p className="card-text">{time}</p>
        <h4 className="card-subtitle mb-2 text-muted">Date:</h4>
        <p className="card-text">{date}</p>
        
     </div>
    </div>
  );
}

export default EventCard;