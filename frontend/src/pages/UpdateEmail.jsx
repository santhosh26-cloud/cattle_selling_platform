import { useState } from "react";
import API from "../api/api";
import "../styles/profile-forms.css";
const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      await API.put("/user/email", { email });
      setMsg("Email updated ✔");
    } catch {
      setMsg("Email already exists ❌");
    }
  };

  return (
    <div className="profile-edit-card">
      <h2>Update Email</h2>
      <input placeholder="New Email" onChange={e => setEmail(e.target.value)} />
      <button onClick={submit}>Save</button>
      {msg}
    </div>
  );
};

export default UpdateEmail;
