import api from "./apiService";

export const getAllUsers = async () => {
  const response = await api.get(`auth/all`);

  return response.data;
};
