import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { jwtDecode } from "jwt-decode";
import "../styles/auth.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      const decoded = jwtDecode(res.data.token);
      const role = decoded.role?.toLowerCase().replace("role_", "");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>🐄 Cattle App</h2>
        <p className="auth-subtitle">Admin Login</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
