import api from "../cofig/Configaxios";

export const fetchDashboardData = async () => {
  try {
    return await api.get("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
