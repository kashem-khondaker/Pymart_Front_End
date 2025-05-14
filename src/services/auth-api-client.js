import axios from "axios";

const authApiClient = axios.create({
  baseURL: "https://phimart-shop.vercel.app/api/v1",
});

export default authApiClient;

axios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("authTokens")).access
    if (token) {
        config.headers.Authorization = `JWT ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);
