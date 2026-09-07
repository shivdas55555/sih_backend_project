import axios from "axios";

// 1. Get raw backend URL (or fallback)
let rawUrl = import.meta.env.VITE_API_URL || "https://sih-backend-project.onrender.com";

// 2. Strip Markdown link brackets, parentheses, and spaces
let cleanUrl = rawUrl.replace(/\[|\]|\(|\)/g, "").trim();

// 3. Ensure absolute protocol exists
if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
  cleanUrl = `https://${cleanUrl}`;
}

// 4. Strip trailing slashes and redundant /api suffixes
const cleanBaseUrl = cleanUrl.replace(/\/+$/, "").replace(/\/api$/, "");

const API = axios.create({
  baseURL: `${cleanBaseUrl}/api`, // Evaluates strictly to https://sih-backend-project.onrender.com/api
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