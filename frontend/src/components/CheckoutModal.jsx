import { useState } from "react";
import "../styles/checkout-modal.css";

const CheckoutModal = ({ order, onClose, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    const shippingData = {
      address,
      phone,
      note,
      paymentMethod,
      upiId: paymentMethod === "upi" ? upiId : null,
      cardNumber: paymentMethod === "card" ? cardNumber : null,
    };

    setSuccess(true);

    setTimeout(() => {
      onConfirm(shippingData);
    }, 1500);
  };

  return (
    <>
      {/* Background Overlay */}
      <div className="checkout-overlay" onClick={onClose}></div>

      {/* Sliding Drawer */}
      <div className="checkout-drawer">
        {success ? (
          <div className="success-box">
            <div className="success-animation"></div>
            <h2>Payment Successful! 🎉</h2>
            <p>Your order has been confirmed.</p>
          </div>
        ) : (
          <>
            <h2>Checkout — Order #{order.order_id}</h2>

            <label>Address</label>
            <textarea
              className="input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label>Phone</label>
            <input
              className="input"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label>Payment Method</label>
            <select
              className="input"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="card">💳 Credit / Debit Card</option>
              <option value="upi">📱 UPI</option>
              <option value="cod">💵 Cash on Delivery</option>
            </select>

            {paymentMethod === "upi" && (
              <>
                <label>UPI ID</label>
                <input
                  className="input"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </>
            )}

            {paymentMethod === "card" && (
              <>
                <label>Card Number</label>
                <input
                  className="input"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </>
            )}

            <label>Note (optional)</label>
            <input
              className="input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <button className="checkout-btn" onClick={handleSubmit}>
              Confirm & Pay
            </button>

            <button className="checkout-cancel" onClick={onClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CheckoutModal;
