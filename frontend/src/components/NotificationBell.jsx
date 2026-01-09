import { useEffect, useState } from "react";
import { getSellerNotifications, markNotificationRead } from "../api/SellerNotificationApi";
import "../styles/notifications.css";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getSellerNotifications();
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to load notifications");
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      loadNotifications();
    } catch (err) {
      alert("Error marking notification");
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="notif-wrapper">

      {/* Notification Bell */}
      <div className="notif-icon" onClick={() => setOpen(!open)}>
        🔔
        {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
      </div>

      {/* Dropdown Panel */}
      {open && (
        <div className="notif-dropdown">
          <h4>Notifications</h4>

          {notifications.length === 0 ? (
            <p className="empty-text">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.notification_id}
                className={`notif-item ${n.is_read ? "" : "unread"}`}
              >
                <p>{n.message}</p>
                <small>{new Date(n.created_at).toLocaleString()}</small>

                {!n.is_read && (
                  <button
                    className="mark-read-btn"
                    onClick={() => handleMarkRead(n.notification_id)}
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
