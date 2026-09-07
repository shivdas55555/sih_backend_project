import axios from "axios";

// Automatically falls back to Render backend if environment variable is missing
const rawBaseUrl = import.meta.env.VITE_API_URL || "https://sih-backend-project.onrender.com/api";

// Strip any trailing slashes or '/api' to prevent double path issues
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, "").replace(/\/api$/, "");

const API = axios.create({
  baseURL: `${cleanBaseUrl}/api`, // Single source of truth for the /api prefix
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests and dynamically add the Authorization token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;