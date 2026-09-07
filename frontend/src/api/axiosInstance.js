import axios from "axios";

// Hardcoded direct origin (No environment variables, no caching issues)
const BACKEND_ORIGIN = "https://sih-backend-project.onrender.com";

const API = axios.create({
  baseURL: `${BACKEND_ORIGIN}/api`, // Evaluates strictly to: https://sih-backend-project.onrender.com/api
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;