import { useState } from "react";
import API from "../api/api";
import "../styles/profile-forms.css";
const ChangePassword = () => {
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");
  const [message, setMessage] = useState("");

  const save = async () => {
    try {
      await API.put("/user/password", { oldPassword, newPassword });
      setMessage("Password changed ✔");
    } catch {
      setMessage("Failed to change password ❌");
    }
  };

  return (
    <div className="profile-edit-card">
      <h2>Change Password</h2>

      <input type="password" placeholder="Old Password" onChange={e => setOld(e.target.value)} />
      <input type="password" placeholder="New Password" onChange={e => setNew(e.target.value)} />

      <button onClick={save}>Save</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
