import toast from "react-hot-toast";
import api from "../cofig/Configaxios";

export const addUser = async (user) => {
  console.log(user);
  try {
    return await api.post("/admin/register", user);
  } catch (error) {
    console.log(error);
    toast.error("unble to add user");
  }
};

export const deleteUser = async (userId) => {
  try {
    return await api.delete(`/admin/delete/user/${userId}`);
  } catch (error) {
    console.log(error);
    toast.error("unable to delete user");
  }
};

export const getAllUsers = async () => {
  try {
    return await api.get("/admin/users");
  } catch (error) {
    console.log(error);
  }
};
