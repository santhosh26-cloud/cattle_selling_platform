import { useEffect, useState } from "react";
import { getAllUsers, updateUserStatus } from "../api/adminApi";
import "../styles/admin-users.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateUserStatus(id, status);
      loadUsers();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="admin-users-container">
      <h2>👥 Users Management</h2>

      <div className="admin-users-card">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>

                <td>
                  <span className={`status-badge ${u.status}`}>
                    {u.status}
                  </span>
                </td>

                <td>
                  {u.status === "active" ? (
                    <button
                      className="btn-danger"
                      onClick={() => changeStatus(u.user_id, "blocked")}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="btn-primary"
                      onClick={() => changeStatus(u.user_id, "active")}
                    >
                      Unblock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {users.length === 0 && (
          <p className="no-data">No users found</p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
