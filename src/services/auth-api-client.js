import axios from "axios";

const authApiClient = axios.create({
  baseURL: "https://phimart-shop.vercel.app/api/v1",
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
