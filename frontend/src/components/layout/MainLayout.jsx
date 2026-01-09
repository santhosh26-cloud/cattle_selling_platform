import Navbar from "./Navbar";
import SellerNavbar from "../SellerNavbar";
import Sidebar from "./Sidebar";
import "../../styles/layout.css";

const MainLayout = ({ children }) => {
  const role = localStorage.getItem("role");

  return (
    <>
      {/* Show different navbar based on role */}
      {role === "seller" ? <SellerNavbar /> : <Navbar />}

      <div className="layout">
        {/* Sidebar also depends on role */}
        <Sidebar role={role} />
        <main className="content">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
