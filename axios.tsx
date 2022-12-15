import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5090/api",
});

api.interceptors.request.use(async (config) => {
  let token = localStorage.jwt ?? "";
  config.headers!.Authorization = `Bearer ${token}`;

  return config;
});

export { api };
