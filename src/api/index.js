import axios from "axios";
const BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
export const predict  = (text) => axios.post(`${BASE}/predict`,  { text }).then(r => r.data);
export const explain  = (text) => axios.post(`${BASE}/explain`,  { text }).then(r => r.data);
export const rephrase = (text) => axios.post(`${BASE}/rephrase`, { text }).then(r => r.data);
