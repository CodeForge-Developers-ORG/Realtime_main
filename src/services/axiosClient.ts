import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://64.227.165.108/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // agar cookies ya auth chahiye
});

export default axiosClient;
