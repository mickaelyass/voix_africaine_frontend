import axios from 'axios';

const api = axios.create({
  baseURL: 'https://voix-africaine.onrender.com',
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