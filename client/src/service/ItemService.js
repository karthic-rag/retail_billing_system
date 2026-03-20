import toast from "react-hot-toast";
import api from "../cofig/Configaxios";

export const addItem = async (item) => {
  try {
    return await api.post("/items/add", item);
  } catch (error) {
    console.log(error);
    toast.error("unable to add item");
  }
};

export const deleteItem = async (itemId) => {
  try {
    return await api.delete(`/items/delete/${itemId}`);
  } catch (error) {
    console.log(error);
    toast.error("unable to delete item");
  }
};

export const getAllItems = async () => {
  try {
    return await api.get("/items/get/all");
  } catch (error) {
    console.log(error);
  }
};
