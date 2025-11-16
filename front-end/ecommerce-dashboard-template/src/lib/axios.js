import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:6868/api/v1"
      : "/",
  withCredentials: true,
});
export default axiosInstance;