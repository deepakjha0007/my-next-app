import axios from "axios";
const API_URL = "http://localhost:5000/api";

// ✅ Create axios instance (IMPORTANT)
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

console.log("TOKEN:", localStorage.getItem("token"));

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("token", newAccessToken);

        // attach new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired");

        localStorage.removeItem("token");

        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

/* =========================
   API FUNCTIONS
========================= */

export default api;
