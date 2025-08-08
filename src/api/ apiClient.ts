import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Intercepteur pour ajouter le token JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;