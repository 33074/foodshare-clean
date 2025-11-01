import axios from 'axios';

// Create an 'instance' of axios with the backend URL
const apiClient = axios.create({
  baseURL: 'http://localhost:8086/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// This interceptor automatically adds the "Bearer <token>" header
// to every API call *after* the user logs in.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
