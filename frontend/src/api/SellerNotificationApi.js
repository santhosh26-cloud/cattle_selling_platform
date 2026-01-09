import API from "./api";

export const getSellerNotifications = () => API.get("/seller/notifications");

export const markNotificationRead = (id) =>
  API.put(`/seller/notifications/${id}/read`);
