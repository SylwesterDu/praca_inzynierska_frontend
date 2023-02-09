import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5090/api",
});

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("jwt");
  if (token != null) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
