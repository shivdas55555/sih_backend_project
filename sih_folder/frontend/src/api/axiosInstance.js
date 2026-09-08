import axios from "axios";

const fallbackUrl = "https://sih-backend-project.onrender.com";
let rawUrl = import.meta.env.VITE_API_URL || fallbackUrl;

// Normalize common dashboard typos and prevent a duplicated Render host.
let cleanUrl = rawUrl
  .replace(/\[|\]|\(|\)/g, "")
  .replace(/^https?\/\//i, (protocol) => `${protocol.slice(0, -2)}://`)
  .trim();

if (cleanUrl.includes("sih-backend-project.onrender.com")) {
  cleanUrl = fallbackUrl;
} else if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
  cleanUrl = `https://${cleanUrl}`;
}

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