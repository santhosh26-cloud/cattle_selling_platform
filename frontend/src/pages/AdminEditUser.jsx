import { useState } from "react";
import API from "../api/api";
import "../styles/profile-forms.css";
const AdminEditUser = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);
  const [msg, setMsg] = useState("");

  const save = async () => {
    try {
      await API.put("/user/admin/edit", {
        user_id: user.user_id,
        name, email, role, status
      });
      setMsg("User updated ✔");
    } catch {
      setMsg("Failed to update ❌");
    }
  };

  return (
    <div className="profile-edit-card">
      <h2>Edit User (Admin)</h2>

      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        <option value="admin">Admin</option>
      </select>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>

      <button onClick={save}>Save</button>
      {msg}
    </div>
  );
};

export default AdminEditUser;
