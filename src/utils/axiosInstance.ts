// utils/axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Your API base URL
});

// Request interceptor to add the auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Assuming the access token is stored in localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // You can modify config further here, e.g., set other headers
    return config;
  },
  (error) => {
    // Do something with request error here
    return Promise.reject(error);
  }
);

export default axiosInstance;
