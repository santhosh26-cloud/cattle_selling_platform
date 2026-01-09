import { useEffect, useState } from "react";
import { getAvailableCattle, placeOrder } from "../api/buyerApi";
import "../styles/buyer-dashboard.css";

const BuyerDashboard = () => {
  const [cattle, setCattle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCattle();
  }, []);

  const loadCattle = async () => {
    try {
      const res = await getAvailableCattle();
      setCattle(res.data);
    } finally {
      setLoading(false);
    }
  };

  const orderNow = async (id) => {
    try {
      await placeOrder(id);
      alert("🐄 Order placed successfully");
      loadCattle();
    } catch {
      alert("Failed to place order");
    }
  };

  if (loading) return <p className="loading">Loading cattle...</p>;

  return (
    <div className="buyer-container">
      <h2 className="buyer-title">🐄 Available Cattle</h2>

      <div className="buyer-grid">
        {cattle.map((c) => (
          <div className="buyer-card" key={c.cattle_id}>
            <img
              src={`http://localhost:5000${c.image_url}`}
              alt="cattle"
              className="buyer-image"
            />

            <div className="buyer-info">
              <p><b>Breed:</b> {c.breed_name}</p>
              <p><b>Age:</b> {c.age} years</p>
              <p className="price">₹{c.price}</p>
            </div>

            <button
              className="buyer-btn"
              onClick={() => orderNow(c.cattle_id)}
            >
              Place Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;
