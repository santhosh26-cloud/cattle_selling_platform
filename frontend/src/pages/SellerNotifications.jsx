import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/notifications.css";

const SellerNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const res = await API.get("/seller/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Error loading notifications:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/seller/notifications/${id}/read`);
      loadNotifications(); // Refresh UI
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="notify-container">
      <h2>🔔 Seller Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="notify-list">
          {notifications.map((n) => (
            <li
              key={n.notification_id}
              className={`notify-item ${n.is_read ? "read" : "unread"}`}
              onClick={() => markAsRead(n.notification_id)}
            >
              <strong className="title">{n.title}</strong>
              <p className="message">{n.message}</p>

              <span className="timestamp">
                {new Date(n.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellerNotifications;
