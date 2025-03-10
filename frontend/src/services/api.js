import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:9000/api/",
});

export const getProjects = () => api.get("projects/");
export const getTools = () => api.get("tools/");
export const getExperiences = () => api.get("experiences/");
export const getEducation = () => api.get("education/");
export const getServices = () => api.get("services/");
