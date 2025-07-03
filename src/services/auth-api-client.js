import axios from "axios";

const authApiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

// Interceptor শুধু authApiClient এর উপর apply করা হলো
authApiClient.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens) {
      const token = JSON.parse(tokens)?.access;
      if (token) {
        config.headers.Authorization = `JWT ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authApiClient;
