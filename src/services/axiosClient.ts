import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://app.realtimebiometrics.net/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // agar cookies ya auth chahiye
});

export default axiosClient;
