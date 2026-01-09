import API from "./api";

export const getAvailableCattle = () => API.get("/buyer/cattle");

export const getSingleCattle = (id) => API.get(`/buyer/cattle/${id}`);

export const placeOrder = (cattleId) =>
  API.post("/buyer/order", { cattle_id: cattleId });

export const getMyOrders = () => API.get("/buyer/orders");

export const getPayableOrders = () => API.get("/buyer/orders/payable");

export const payOrder = (orderId, data) => {
  return API.put(`/buyer/orders/${orderId}/pay`, data);
};


