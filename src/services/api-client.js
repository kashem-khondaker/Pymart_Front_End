import axios from "axios";

export default axios.create({
  baseURL: "https://phimart-shop.vercel.app/api/v1",
});
