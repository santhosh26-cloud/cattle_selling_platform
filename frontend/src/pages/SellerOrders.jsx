import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/seller-orders.css";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await API.get("/seller/orders");
      setOrders(res.data);
    } catch {
      alert("Failed to load seller orders");
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/seller/orders/${orderId}/status`, { status: newStatus });
      alert(`Order ${newStatus} successfully!`);
      loadOrders();
    } catch {
      alert("Failed to update order");
    }
  };

  return (
    <div className="seller-orders-container">
      <h2 className="page-title">📦 Customer Orders</h2>

      <div className="orders-card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Breed</th>
              <th>Buyer</th>
              <th>Price</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.order_id}>
                <td>{o.order_id}</td>
                <td>{o.breed_name}</td>
                <td>{o.buyer_name}</td>
                <td>₹{o.price}</td>

                {/* ORDER STATUS BADGE */}
                <td>
                  <span className={`status-badge ${o.order_status.toLowerCase()}`}>
                    {o.order_status}
                  </span>
                </td>

                {/* PAYMENT BADGE */}
                <td>
                  <span className={`payment-badge ${o.payment_status.toLowerCase()}`}>
                    {o.payment_status}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td>
                  {o.order_status.toLowerCase() === "placed" ? (
                    <div className="action-btns">
                      <button
                        className="accept-btn"
                        onClick={() => updateStatus(o.order_id, "accepted")}
                      >
                        Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => updateStatus(o.order_id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="no-action">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="no-orders">No orders received yet.</p>
        )}
      </div>
    </div>
  );
};

export default SellerOrders;
