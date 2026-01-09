import { useState } from "react";
import API from "../../api/api";

const PictureTab = () => {
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      await API.post("/user/upload", formData);
      setMsg("Image uploaded ✔");
    } catch {
      setMsg("Upload failed ❌");
    }
  };

  return (
    <div className="tab-card">
      <h3>Upload Profile Picture</h3>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
};

export default PictureTab;
