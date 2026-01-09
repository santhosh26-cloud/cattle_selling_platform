import { useState } from "react";
import API from "../../api/api";

const ContactTab = () => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");

  const saveContact = async () => {
    try {
      await API.put("/user/contact", { phone, address });
      setMsg("Contact info updated ✔");
    } catch {
      setMsg("Update failed ❌");
    }
  };

  return (
    <div className="tab-card">
      <h3>Edit Contact Info</h3>

      <label>Phone</label>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />

      <label>Address</label>
      <textarea value={address} onChange={(e) => setAddress(e.target.value)} />

      <button onClick={saveContact}>Save</button>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
};

export default ContactTab;
