import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../../api/api";

const ProfileTab = () => {
  const user = jwtDecode(localStorage.getItem("token"));
  const [name, setName] = useState(user.name);
  const [msg, setMsg] = useState("");

  const updateProfile = async () => {
    try {
      await API.put("/user/profile", { name });
      setMsg("Profile updated ✔");
    } catch {
      setMsg("Update failed ❌");
    }
  };

  return (
    <div className="tab-card">
      <h3>Edit Profile</h3>
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <button onClick={updateProfile}>Save</button>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
};

export default ProfileTab;
