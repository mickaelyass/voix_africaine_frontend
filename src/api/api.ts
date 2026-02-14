import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  //baseURL: 'https://voix-africaine.onrender.com',
   baseURL: API_URL,
   withCredentials: true,
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;