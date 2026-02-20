import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// API endpoints
export const getProjects = (params = {}) => api.get("/projects/", { params });
export const getTools = (params = {}) => api.get("/tools/", { params });
export const getExperiences = (params = {}) => api.get("/experiences/", { params });
export const getEducation = (params = {}) => api.get("/education/", { params });
export const getServices = (params = {}) => api.get("/services/", { params });
export const submitContact = (data) => api.post("/contact/", data);
export const getProfile = () => api.get("/profile/");

export default api;