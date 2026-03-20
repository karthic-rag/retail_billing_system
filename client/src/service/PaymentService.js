import toast from "react-hot-toast";
import api from "../cofig/Configaxios";

export const createRazorpayOrder = async (data) => {
  try {
    return await api.post("/payments/create/order", data);
  } catch (error) {
    console.log(error);
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    return await api.post("/payments/verify", paymentData);
  } catch (error) {
    console.log(error);
    toast.error("payment verification failed");
  }
};
