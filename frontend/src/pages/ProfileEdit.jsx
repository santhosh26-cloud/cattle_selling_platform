import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../api/api";
import "../styles/profile-edit.css";

const ProfileEdit = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [name, setName] = useState(user.name);
  const [message, setMessage] = useState("");

  const saveProfile = async () => {
    try {
      await API.put("/user/profile", { name });
      setMessage("Profile updated successfully ✔");
    } catch (err) {
      setMessage("Failed to update profile ❌");
    }
  };

  return (
    <div className="profile-container">

      <div className="profile-card">
        <h2>Edit Profile</h2>

        <label>Name</label>
        <input
          className="input-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="primary-btn" onClick={saveProfile}>
          Save Changes
        </button>

        {message && <p className="msg">{message}</p>}
      </div>

      <div className="profile-actions">
        <a className="action-btn" href="/profile/upload">📤 Upload Profile Picture</a>
        <a className="action-btn" href="/profile/email">📧 Update Email</a>
        <a className="action-btn" href="/profile/password">🔐 Change Password</a>
        <a className="action-btn" href="/profile/contact">📱 Edit Address / Phone</a>
      </div>

    </div>
  );
};

export default ProfileEdit;
