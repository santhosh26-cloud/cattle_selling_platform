import { useState } from "react";
import API from "../api/api";
import "../styles/profile-forms.css";
const ProfilePictureUpload = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      await API.post("/user/upload", formData);
      setMsg("Image uploaded ✔");
    } catch {
      setMsg("Upload failed ❌");
    }
  };

  return (
    <div className="profile-edit-card">
      <h2>Upload Profile Picture</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
      {msg}
    </div>
  );
};

export default ProfilePictureUpload;
