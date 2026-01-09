import { useState } from "react";
import API from "../../api/api";

const EmailTab = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const updateEmail = async () => {
    try {
      await API.put("/user/email", { email });
      setMsg("Email updated ✔");
    } catch {
      setMsg("Email already used ❌");
    }
  };

  return (
    <div className="tab-card">
      <h3>Update Email</h3>
      <label>New Email</label>
      <input onChange={(e) => setEmail(e.target.value)} />

      <button onClick={updateEmail}>Save</button>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
};

export default EmailTab;
