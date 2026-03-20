import api from "../cofig/Configaxios";

export const addCategory = async (category) => {
  try {
    return await api.post("/categories/add", category);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    return await api.delete(`/categories/delete/${categoryId}`);
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    return await api.get("/categories/get/all");
  } catch (error) {
    console.log(error);
  }
};
