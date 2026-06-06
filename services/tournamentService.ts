import axios from "axios";
import api from "./apiService";

const API_URL = "http://localhost:5000/api/tournaments";
const ADMIN_API = "http://localhost:5000/api/admin";

// ================= GET ALL TOURNAMENTS =================

export const getAllTournamentsAPI = async () => {
  const response = await axios.get(`${API_URL}/all`);
  console.log(response.data);

  return response.data;
};

// export const getTournamentsAPI = async (status, page, limit) => {
//   const response = await axios.get(`${API_URL}`, {
//     params: {
//       ...(status !== "All" && { status }),
//       page,
//       limit,
//     },
//   });
//   console.log(response);

//   return response.data;
// };
// ================= GET SINGLE TOURNAMENT =================
// export const getTournamentByIdAPI = async (id) => {
//   const response = await axios.get(`${API_URL}/${id}`);

//   return response.data;
// };

// // ================= JOIN TOURNAMENT =================
// export const joinTournamentAPI = async (id) => {
//   const token = localStorage.getItem("token");

//   const response = await axios.post(
//     `http://localhost:5000/api/join/${id}`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );

//   return response.data;
// };

// ================= ADMIN STATS =================
export const getAdminStatsAPI = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${ADMIN_API}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ================= CREATE TOURNAMENT =================
// export const createTournamentAPI = async (tournamentData) => {
//   try {
//     const response = await api.post("/tournaments", tournamentData);

//     return response.data;
//   } catch (error) {
//     console.log("FULL ERROR:", error);
//     console.log("ERROR RESPONSE:", error.response?.data);

//     throw error;
//   }
// };

// // ================= DELETE TOURNAMENT =================
// export const deleteTournamentAPI = async (accessToken, id) => {
//   const token = accessToken;

//   const response = await axios.delete(`${API_URL}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };

// // ================= UPDATE TOURNAMENT =================
// export const updatedTournamentAPI = async (accessToken, id, data) => {
//   const token = accessToken;

//   const response = await axios.patch(`${API_URL}/${id}`, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };
