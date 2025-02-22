import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:`https://task-board-2str.onrender.com`,
    // baseURL:`http://localhost:6080/`,
    // baseURL:`https://task-board-l2qj.onrender.com`,
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
