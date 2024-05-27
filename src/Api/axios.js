import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-api-deploy-7hq2.onrender.com",
});
export { axiosInstance };
