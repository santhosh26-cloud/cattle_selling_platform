import { useState } from "react";
import API from "../api/api";
import "../styles/profile-forms.css";
const UpdateContactInfo = () => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");

  const save = async () => {
    try {
      await API.put("/user/contact", { phone, address });
      setMsg("Contact info updated ✔");
    } catch {
      setMsg("Failed to update ❌");
    }
  };

  return (
    <div className="profile-edit-card">
      <h2>Update Contact Info</h2>

      <input placeholder="Phone" onChange={e => setPhone(e.target.value)} />
      <textarea placeholder="Address" onChange={e => setAddress(e.target.value)} />

      <button onClick={save}>Save</button>
      {msg}
    </div>
  );
};

export default UpdateContactInfo;
