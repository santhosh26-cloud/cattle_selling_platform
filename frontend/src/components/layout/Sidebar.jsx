import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";

const Sidebar = ({ role }) => {
  return (
    <aside className="sidebar">
      <h3>🐄 Cattle App</h3>

      {role === "admin" && (
        <>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
        </>
      )}

      {role === "seller" && (
        <>
          <NavLink to="/seller/dashboard">Dashboard</NavLink>
          <NavLink to="/seller/orders">Orders</NavLink>
          <NavLink to="/seller/notifications">Notifications</NavLink>
        </>
      )}

      {role === "buyer" && (
        <>
          <NavLink to="/buyer/dashboard">Dashboard</NavLink>
          <NavLink to="/buyer/orders">Orders</NavLink>
        </>
      )}

      {/* <NavLink to="/profile">Profile</NavLink> */}
      <NavLink to="/settings">Settings</NavLink>
    </aside>
  );
};

export default Sidebar;
