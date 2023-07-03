import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBooksClick = () => {
    navigate("/books");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="../images/bookclub2.png" alt="Logo" style={{ marginRight: "10px" }} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontSize: "18px", fontWeight: "bold" }}>
                Home
              </Link>
            </li>

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/events" style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Events
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-link" onClick={handleBooksClick} style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Books
                  </button>
                </li>

                <li className="nav-item">
                  <button className="btn btn-link" onClick={logOutUser} style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <span className="nav-link navbar-text" style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {user && user.name}
                  </span>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;