import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/edit-cattle.css";

const TAG_OPTIONS = [
  "Healthy",
  "Vaccinated",
  "Pregnant",
  "High Milk Yield",
  "Calm",
  "Pure Breed",
  "Trained",
  "Young",
  "Old",
];

const EditCattle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/seller/cattle/${id}`);
        const data = res.data;

        setBreed(data.breed_id);
        setAge(data.age);
        setPrice(data.price);
        setDescription(data.description);
        setTags(data.tags ? data.tags.split(",") : []);
        setCurrentImage(`http://localhost:5000${data.image_url}`);
      } catch {
        alert("Failed to load cattle data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("breed_id", breed);
    formData.append("age", age);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("tags", tags.join(","));

    if (newImage) formData.append("image", newImage);

    try {
      await API.put(`/seller/cattle/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Cattle updated successfully!");
      navigate("/seller/dashboard");

    } catch {
      alert("Update failed");
    }
  };

  if (loading) return <p className="loading">Loading cattle...</p>;

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2 className="edit-title">Edit Cattle</h2>

        <div className="image-section">
          <label>Current Image</label>
          <img src={currentImage} className="current-img" alt="Cattle" />
        </div>

        {previewImage && (
          <div className="image-section">
            <label>New Image Preview</label>
            <img src={previewImage} className="preview-img" alt="Preview" />
          </div>
        )}

        <div className="edit-field">
          <label>Update Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="edit-field">
          <label>Breed ID</label>
          <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
        </div>

        <div className="edit-field">
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <div className="edit-field">
          <label>Price (₹)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="edit-field">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="edit-field">
          <label>Tags</label>
          <div className="tag-container">
            {TAG_OPTIONS.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`tag-btn ${tags.includes(tag) ? "selected" : ""}`}
                onClick={() =>
                  setTags((prev) =>
                    prev.includes(tag)
                      ? prev.filter((t) => t !== tag)
                      : [...prev, tag]
                  )
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="edit-actions">
          <button className="cancel-btn" onClick={() => navigate("/seller/dashboard")}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCattle;
