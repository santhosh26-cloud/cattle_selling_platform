import API from "./api";

export const addCattle = (formData) =>
  API.post("/seller/cattle", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const getSellerOrders = () =>
  API.get("/seller/orders");

export const getMyCattle = () =>
  API.get("/seller/my-cattle");

export const getCattleById = async (id) => {
  return await API.get(`/seller/cattle/${id}`);
};

export const updateOrderStatus = (orderId, status) =>
  API.put(`/seller/orders/${orderId}/status`, { status });

export const deleteCattle = async (id) => {
  return await API.delete(`/seller/cattle/${id}`);
};
