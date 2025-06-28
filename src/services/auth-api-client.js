import axios from "axios";

const authApiClient = axios.create({
  baseURL: "https://pymart-front-end.vercel.app/",
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
