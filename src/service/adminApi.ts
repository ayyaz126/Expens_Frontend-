import axios from "axios";
import { useAuthStore } from "../store/auth.store";

const adminApi = axios.create({
  baseURL: "http://localhost:4000/v1/api/admin",
  withCredentials: true,
});

adminApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Admin dashboard stats
export const fetchAdminDashboardStats = () => adminApi.get("/stats");

// ✅ NEW: Category-wise expenses summary
export const fetchCategorySummary = () => adminApi.get("/expenses/summary");

export default adminApi;


