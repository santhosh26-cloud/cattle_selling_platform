import { useEffect, useState } from "react";
import { getPayableOrders, payOrder } from "../api/buyerApi";
import "../styles/payable-orders.css";

const BuyerPayableOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadPayableOrders();
  }, []);

  const loadPayableOrders = async () => {
    const res = await getPayableOrders();
    setOrders(res.data);
  };

  const handlePayment = async (id) => {
    if (!window.confirm("Proceed to payment?")) return;

    try {
      await payOrder(id);
      alert("Payment successful!");
      loadPayableOrders();
    } catch {
      alert("Payment failed");
    }
  };

  return (
    <div className="payable-container">
      <h2 className="payable-title">💳 Payable Orders</h2>

      <div className="payable-card">
        {orders.length === 0 ? (
          <p className="no-orders">No payable orders.</p>
        ) : (
          <table className="payable-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Breed</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.order_id}>
                  <td>{o.order_id}</td>
                  <td>{o.breed_name}</td>
                  <td>₹{o.price}</td>
                  <td>
                    <span className="badge pending">Pending</span>
                  </td>
                  <td>
                    <button
                      className="pay-btn"
                      onClick={() => handlePayment(o.order_id)}
                    >
                      Pay Now 💳
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BuyerPayableOrders;
