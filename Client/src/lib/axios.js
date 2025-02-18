import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:`http://${window.location.hostname}:6080/`,
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
