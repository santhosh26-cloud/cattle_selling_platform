import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus
} from "../api/adminApi";
import "../styles/admin-orders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // modal
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, search, filterStatus]);

  const loadOrders = async () => {
    const res = await getAllOrders();
    setOrders(res.data);
  };

  const applyFilters = () => {
    let data = [...orders];

    // search filter
    if (search.trim() !== "") {
      data = data.filter((o) =>
        o.buyer_name.toLowerCase().includes(search.toLowerCase()) ||
        o.breed_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // status filter
    if (filterStatus !== "all") {
      data = data.filter(
        (o) =>
          o.order_status.toLowerCase() === filterStatus.toLowerCase() ||
          o.payment_status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    setFiltered(data);
    setPage(1); // reset page on filter
  };

  const changeOrderStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  const changePaymentStatus = async (id, status) => {
    await updatePaymentStatus(id, status);
    loadOrders();
  };

  // pagination logic
  const start = (page - 1) * limit;
  const paginatedData = filtered.slice(start, start + limit);
  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <div className="admin-orders-container">
      <h2>📦 All Orders</h2>

      {/* Search + Filters */}
      <div className="filters-row">
        <input
          type="text"
          placeholder="Search buyer or breed..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="admin-orders-card">
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Breed</th>
              <th>Price</th>
              <th>Order</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((o) => (
              <tr key={o.order_id} onClick={() => setSelected(o)}>
                <td>{o.order_id}</td>
                <td>{o.buyer_name}</td>
                <td>{o.seller_name}</td>
                <td>{o.breed_name}</td>
                <td>₹{o.price}</td>

                <td>
                  <span className={`order-badge ${o.order_status}`}>
                    {o.order_status}
                  </span>
                </td>

                <td>
                  <span className={`payment-badge ${o.payment_status}`}>
                    {o.payment_status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      changeOrderStatus(o.order_id, "accepted");
                    }}
                  >
                    Accept
                  </button>

                  <button
                    className="btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      changeOrderStatus(o.order_id, "rejected");
                    }}
                  >
                    Reject
                  </button>

                  <button
                    className="btn-success"
                    onClick={(e) => {
                      e.stopPropagation();
                      changePaymentStatus(o.order_id, "paid");
                    }}
                  >
                    Mark Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && <p className="no-data">No orders found</p>}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Order Details</h3>

            <p><b>Order ID:</b> {selected.order_id}</p>
            <p><b>Buyer:</b> {selected.buyer_name}</p>
            <p><b>Seller:</b> {selected.seller_name}</p>
            <p><b>Breed:</b> {selected.breed_name}</p>
            <p><b>Price:</b> ₹{selected.price}</p>
            <p><b>Status:</b> {selected.order_status}</p>
            <p><b>Payment:</b> {selected.payment_status}</p>

            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
