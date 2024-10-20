import axios from "axios";
import toast from "react-hot-toast";

// Axios Instance
const instance = axios.create({
  // baseURL: import.meta.env.NODE_APP_SERVER_URL
  baseURL: "http://localhost:9091/"
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      // console.log('canceled');
    } else if (!error.response) {
      toast.error("Network error");
      // localStorage.removeItem('role');
      // localStorage.removeItem('token');
      // localStorage.removeItem('userId');
    }
    if (error?.response?.status === 401) {
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      // toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
