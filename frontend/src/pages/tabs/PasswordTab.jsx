import { useState } from "react";
import API from "../../api/api";

const PasswordTab = () => {
  const [oldPass, setOld] = useState("");
  const [newPass, setNew] = useState("");
  const [msg, setMsg] = useState("");

  const changePassword = async () => {
    try {
      await API.put("/user/password", { oldPassword: oldPass, newPassword: newPass });
      setMsg("Password changed ✔");
    } catch {
      setMsg("Error updating password ❌");
    }
  };

  return (
    <div className="tab-card">
      <h3>Change Password</h3>
      <label>Old Password</label>
      <input type="password" onChange={(e) => setOld(e.target.value)} />

      <label>New Password</label>
      <input type="password" onChange={(e) => setNew(e.target.value)} />

      <button onClick={changePassword}>Update</button>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
};

export default PasswordTab;
