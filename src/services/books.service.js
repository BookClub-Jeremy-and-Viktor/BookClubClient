import axios from "axios";

class BooksService {
  constructor() {
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    this.api = axios.create({
      baseURL: baseURL,
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/books
  createBook = (requestBody) => {
    return this.api.post("/api/books", requestBody);
  };

  // GET /api/books/:id
  getBook = (id) => {
    return this.api.get(`/api/books/${id}`);
  };

  // PUT /api/books/:id
  updateBook = (id, requestBody) => {
    return this.api.put(`/api/books/${id}`, requestBody);
  };

  // DELETE /api/books/:id
  deleteBook = (id) => {
    return this.api.delete(`/api/books/${id}`);
  };
}

// Create one instance (object) of the service
const booksService = new BooksService();

export default booksService;
