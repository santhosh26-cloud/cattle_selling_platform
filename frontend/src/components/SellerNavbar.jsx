import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import "../styles/seller-navbar.css";

const SellerNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="seller-navbar">
      <div className="nav-left">
        <h2>Cattle Seller</h2>
      </div>

      <div className="nav-right">
        <NotificationBell />

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SellerNavbar;
