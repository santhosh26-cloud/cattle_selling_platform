import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { jwtDecode } from "jwt-decode";
import "../styles/auth.css";

const Login = () => {
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

      // ✅ normalize role
      const role = decoded.role?.toLowerCase().replace("role_", "");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      // ✅ role-based redirect
      if (role === "admin") navigate("/admin/dashboard", { replace: true });
      else if (role === "seller") navigate("/seller/dashboard", { replace: true });
      else if (role === "buyer") navigate("/buyer/dashboard", { replace: true });
      else {
        setError("Invalid user role");
        localStorage.clear();
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>🐄 Cattle App</h2>
        <p className="auth-subtitle">Login to your account</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
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

        <button className="auth-btn">Login</button>
        <p style={{ textAlign: "center", marginTop: "15px" }}>
  Don’t have an account?{" "}
  <span
    style={{ color: "#2563eb", cursor: "pointer" }}
    onClick={() => navigate("/register")}
  >
    Register
  </span>
</p>

      </form>
    </div>
  );
};

export default Login;
