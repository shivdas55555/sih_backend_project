import axios from "axios";

const fallbackUrl = "https://sih-backend-project.onrender.com";
let rawUrl = import.meta.env.VITE_API_URL || fallbackUrl;

// Clean stray brackets, parens, and spaces from environment variable inputs
let cleanUrl = rawUrl
  .replace(/\[|\]|\(|\)/g, "")
  .replace(/^https?\/\//i, (protocol) => `${protocol.slice(0, -2)}://`)
  .trim();

if (cleanUrl.includes("sih-backend-project.onrender.com")) {
  cleanUrl = fallbackUrl;
} else if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
  cleanUrl = `https://${cleanUrl}`;
}

// Ensure base URL cleanly ends with /api
const cleanBaseUrl = cleanUrl.replace(/\/+$/, "").replace(/\/api$/, "");

const API = axios.create({
  baseURL: `${cleanBaseUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
