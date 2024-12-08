import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/`,
  timeout: import.meta.env.VITE_TIMEOUT,
  params: {
    apikey: import.meta.env.VITE_API_KEY
  },
  headers: { "Content-Type": "application/json" }
});

export default api;
