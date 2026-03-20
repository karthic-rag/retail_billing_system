import toast from "react-hot-toast";
import api from "../cofig/Configaxios";

export const login = async (data) => {
  try {
    return await api.post("/auth/login", data);
  } catch (error) {
    console.log(error);
    toast.error("unable to login");
  }
};
