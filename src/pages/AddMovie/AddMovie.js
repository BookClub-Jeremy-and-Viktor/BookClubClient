import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../api/service";
import axios from "axios";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post("http://localhost:5005/api/upload", uploadData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setImageUrl(response.data.fileUrl);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    service
      .createMovie({ title, description, imageUrl })
      .then((res) => {
        setTitle("");
        setDescription("");
        setImageUrl("");
        navigate("/");
      })
      .catch((err) => console.log("Error while adding the new movie: ", err));
  };

  return (
    <div className="container" style={{ maxWidth: "400px" }}>
      <h2>New Image</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save new image
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
