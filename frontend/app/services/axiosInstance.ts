import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Replace with your API base URL
  timeout: 20000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // You can modify the request config before the request is sent
//     // For example, add authentication tokens
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
