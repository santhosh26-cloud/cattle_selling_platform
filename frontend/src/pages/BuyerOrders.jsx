import { useEffect, useState } from "react";
import { getMyOrders, payOrder } from "../api/buyerApi";
import CheckoutModal from "../components/CheckoutModal";
import "../styles/buyer-orders.css";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [invoiceLink, setInvoiceLink] = useState("");

  const loadOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.payment_status.toLowerCase() === filter);

  const handlePayNow = (order) => {
    setSelectedOrder(order);            // store full object
    setSelectedOrderId(order.order_id); // store ID separately
    setShowCheckout(true);
  };

  const confirmPayment = async (shippingData) => {
    try {
      await payOrder(selectedOrderId, shippingData);

      setInvoiceLink(`/api/buyer/orders/${selectedOrderId}/invoice`);

      setShowCheckout(false);
      loadOrders();
    } catch (err) {
      alert("Payment failed");
      console.error(err);
    }
  };

  return (
    <div className="modern-container">
      <div className="header">
        <h2>📦 My Orders</h2>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="orders-grid">
        {filteredOrders.map((o) => (
          <div className="order-card" key={o.order_id}>
            <h3>Order #{o.order_id}</h3>
            <p><strong>Breed:</strong> {o.breed_name}</p>
            <p><strong>Price:</strong> ₹{o.price}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`badge status-${o.order_status.toLowerCase()}`}>
                {o.order_status}
              </span>
            </p>

            <div className="payment-section">
              {o.order_status.toLowerCase() === "rejected" ? (
                <div className="badge rejected">❌ Rejected</div>
              ) : o.payment_status.toLowerCase() === "pending" ? (
                <button className="buy-btn" onClick={() => handlePayNow(o)}>
                  Pay Now 💳
                </button>
              ) : (
                <div className="badge paid">✔ Paid</div>
              )}
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <p className="empty-text">No orders found</p>
        )}
      </div>

      {invoiceLink && (
        <div className="invoice-box">
          🎉 Payment Completed –{" "}
          <a href={invoiceLink} target="_blank">
            Download Invoice
          </a>
        </div>
      )}

      {showCheckout && (
        <CheckoutModal
          order={selectedOrder}
          onConfirm={confirmPayment}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
};

export default BuyerOrders;
