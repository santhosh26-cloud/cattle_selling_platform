import API from "./api";

export const getAllOrders = () => API.get("/admin/orders");

export const updateOrderStatus = (orderId, status) =>
  API.put(`/admin/orders/${orderId}/status`, {
    order_status: status
  });

export const updatePaymentStatus = (orderId, status) =>
  API.put(`/admin/orders/${orderId}/payment`, {
    payment_status: status
  });

export const getAllUsers = () => API.get("/admin/users");

export const updateUserStatus = (userId, status) =>
  API.put(`/admin/users/${userId}/status`, { status });