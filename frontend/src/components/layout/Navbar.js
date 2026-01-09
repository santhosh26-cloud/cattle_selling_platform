import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <h3>🐄 Cattle App</h3>

      <div className="navbar-links">
        <button onClick={toggleDarkMode}>🌙</button>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
