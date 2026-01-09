import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 1️⃣ Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 2️⃣ Logged in but role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ Authorized
  return children;
};

export default ProtectedRoute;
