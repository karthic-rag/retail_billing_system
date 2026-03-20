import toast from "react-hot-toast";
import api from "../cofig/Configaxios";

export const latestOrders = async () => {
  try {
    return await api.get("/orders/get/all");
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (order) => {
  try {
    return await api.post("/orders/create", order);
  } catch (error) {
    console.log(error);
    toast.error("unable to create order");
  }
};

export const deleteOrder = async (id) => {
  try {
    return await api.delete(`/orders/delete/${id}`);
  } catch (error) {
    console.log(error);
    toast.error("unable to delete order");
  }
};
