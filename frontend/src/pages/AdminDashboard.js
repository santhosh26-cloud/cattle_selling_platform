import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/dashboard.css";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/analytics")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Unauthorized");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Admin Dashboard</h2>

      {/* USERS */}
      <div className="card-grid">
        <DashboardCard title="Total Users" value={data.users.total_users} />
        <DashboardCard title="Buyers" value={data.users.buyers} />
        <DashboardCard title="Sellers" value={data.users.sellers} />
        <DashboardCard title="Blocked Users" value={data.users.blocked_users} />
      </div>

      {/* CATTLE */}
      <h3 className="section-title">🐄 Cattle Stats</h3>
      <div className="card-grid">
        <DashboardCard title="Total Cattle" value={data.cattle.total_cattle} />
        <DashboardCard title="Sold" value={data.cattle.sold_cattle} />
        <DashboardCard title="Available" value={data.cattle.available_cattle} />
      </div>

      {/* ORDERS */}
      <h3 className="section-title">🧾 Orders & Revenue</h3>
      <div className="card-grid">
        <DashboardCard title="Total Orders" value={data.orders.total_orders} />
        <DashboardCard
          title="Total Revenue"
          value={`₹${data.revenue.total_revenue}`}
        />
      </div>
    </div>
  );
}

/* Reusable Card */
const DashboardCard = ({ title, value }) => {
  return (
    <div className="dashboard-card">
      <p className="card-title">{title}</p>
      <h3 className="card-value">{value}</h3>
    </div>
  );
};

export default AdminDashboard;
