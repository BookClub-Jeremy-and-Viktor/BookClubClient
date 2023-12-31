import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // axios.post(`${API_URL}/auth/login`, requestBody

    authService
      .login(requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title shadow-lg p-3 mb-5 bg-body-tertiary rounded">Login</h1>

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group ">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    className="form-control shadow p-3 mb-5 bg-body-tertiary rounded"
                  />
                </div>

                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className="form-control shadow p-3 mb-5 bg-body-tertiary rounded"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}

              <p>Don't have an account yet?</p>
              <Link to={"/signup"}> Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;