import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  // اگر JWT در header است، این لازم نیست:
  withCredentials: false,
});

export async function loginUser({ email, password }) {
  // اگر از simplejwt استفاده کنی endpoint معمولاً /api/token/
  const { data } = await api.post("/api/login/", { email, password });
  return data; // انتظار: { access, refresh?, user? }
}
