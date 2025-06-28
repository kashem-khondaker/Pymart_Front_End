import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://pymart-front-end.vercel.app/",
});


export default apiClient;