import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { jwtDecode } from "jwt-decode";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });
      const decoded = jwtDecode(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role",decoded.role); // 🔐 REQUIRED

      navigate("/seller/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Seller Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
      <p>
      New user? <a href="/register">Register here</a>
    </p>
    </form>
  );
};

export default SellerLogin;
