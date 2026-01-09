import { useState, useEffect } from "react";
import { addCattle, getMyCattle, deleteCattle } from "../api/sellerApi";
import "../styles/seller-dashboard.css";
import { useNavigate } from "react-router-dom";

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

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [breedId, setBreedId] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [cattleList, setCattleList] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCattle = async () => {
    try {
      const response = await getMyCattle();
      setCattleList(Array.isArray(response.data) ? response.data : []);
    } catch {
      alert("Failed to load cattle list");
      setCattleList([]);
    }
  };

  useEffect(() => {
    loadCattle();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("breed_id", breedId);
    formData.append("age", age);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("tags", tags.join(",")); // FIXED
    formData.append("status", "available");
    formData.append("image", image);

    try {
      await addCattle(formData);
      alert("🐄 Cattle added successfully");
      setBreedId("");
      setAge("");
      setPrice("");
      setDescription("");
      setTags([]);
      setImage(null);
      loadCattle();
    } catch {
      alert("Failed to add cattle");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteCattle(id);
      loadCattle();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="seller-container">
      <h2 className="seller-title">🐄 Seller Dashboard</h2>

      <form className="seller-card" onSubmit={handleSubmit}>
        <h3>Add New Cattle</h3>

        <div className="seller-field">
          <label>Breed ID</label>
          <input
            type="text"
            value={breedId}
            onChange={(e) => setBreedId(e.target.value)}
            required
          />
        </div>

        <div className="seller-field">
          <label>Age (years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="seller-field">
          <label>Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="seller-field">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Health, breed info, weight, color etc..."
            required
          />
        </div>

        <div className="seller-field">
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

        <div className="seller-field">
          <label>Cattle Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button className="seller-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Cattle"}
        </button>
      </form>

      <h3 className="section-title">My Cattle</h3>

      {cattleList.length === 0 ? (
        <p className="empty-text">No cattle added yet.</p>
      ) : (
        <div className="cattle-grid">
          {cattleList.map((cattle) => (
            <div className="cattle-card" key={cattle.cattle_id}>
              <img
                src={`http://localhost:5000${cattle.image_url}`}
                alt="Cattle"
                className="cattle-img"
              />

              <div className="cattle-info">
                <p><strong>Breed ID:</strong> {cattle.breed_id}</p>
                <p><strong>Age:</strong> {cattle.age} Years</p>
                <p><strong>Price:</strong> ₹{cattle.price}</p>
                <p><strong>Description:</strong> {cattle.description}</p>

                <div className="tags-list">
                  {(cattle.tags || "").split(",").map((tag, i) => (
                    <span
                      key={i}
                      className={`tag-pill ${tag.trim().replace(/\s+/g, "")}`} // FIXED
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="edit-btn"
                  onClick={() => navigate(`/seller/edit-cattle/${cattle.cattle_id}`)}
                >
                  Edit ✎
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(cattle.cattle_id)}
                >
                  Delete ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
