import axios from "axios";
import { store } from "../redux/store";
import { logout,setAccessToken } from "../redux/authSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//if token is available attach
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:7000/auth/refresh-token",
          {},
          { withCredentials: true },
        );
        const newAccessToken = res.data.data.accessToken;
          store.dispatch(setAccessToken(newAccessToken))
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log(err);
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
