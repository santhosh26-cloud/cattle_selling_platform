import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { jwtDecode } from "jwt-decode";
import "../styles/auth.css";

/* 🔹 Password strength helper */
const getPasswordStrength = (password) => {
  if (password.length < 6) return "weak";
  if (
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[@$!%*?&]/.test(password)
  ) {
    return "strong";
  }
  return "medium";
};

const Register = () => {
  // 🔹 Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔹 Role & steps
  const [role, setRole] = useState("buyer"); // buyer | seller
  const [step, setStep] = useState(1);

  // 🔹 Seller onboarding
  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");

  // 🔹 UI state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Password strength (THIS is where it belongs)
  const strength = getPasswordStrength(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // 🔴 Confirm password check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // 🔴 Seller onboarding step
    if (role === "seller" && step === 1) {
      setStep(2);
      return;
    }

    try {
      // 1️⃣ Register
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
        farmName,
        location
      });

      // 2️⃣ Auto login after register
      const loginRes = await API.post("/auth/login", {
        email,
        password
      });

      const decoded = jwtDecode(loginRes.data.token);
      const normalizedRole = decoded.role
        ?.toLowerCase()
        .replace("role_", "");

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("role", normalizedRole);

      // 3️⃣ Redirect by role
      if (normalizedRole === "seller") {
        navigate("/seller/dashboard", { replace: true });
      } else {
        navigate("/buyer/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>🐄 Cattle App</h2>
        <p className="auth-subtitle">Create your account</p>

        {error && <div className="auth-error">{error}</div>}

        {/* 🔹 ROLE TOGGLE */}
        <div className="role-toggle">
          <button
            type="button"
            className={role === "buyer" ? "active" : ""}
            onClick={() => {
              setRole("buyer");
              setStep(1);
            }}
          >
            Buyer
          </button>
          <button
            type="button"
            className={role === "seller" ? "active" : ""}
            onClick={() => {
              setRole("seller");
              setStep(1);
            }}
          >
            Seller
          </button>
        </div>

        {/* 🔹 COMMON FIELDS */}
        <div className="auth-field">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* 🔹 PASSWORD STRENGTH */}
          <div className={`strength ${strength}`}>
            Password strength: {strength}
          </div>
        </div>

        <div className="auth-field">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* 🔹 SELLER ONBOARDING (STEP 2) */}
        {role === "seller" && step === 2 && (
          <>
            <div className="auth-field">
              <label>Farm Name</label>
              <input
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <button className="auth-btn" type="submit">
          {role === "seller" && step === 1
            ? "Next"
            : `Register as ${role}`}
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
