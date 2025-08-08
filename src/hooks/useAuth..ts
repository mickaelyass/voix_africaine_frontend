
import apiClient from '../api/ apiClient';

export const register = async (data: {
  email: string;
  password: string;
  full_name: string;
}) => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await apiClient.post('/auth/token', 
    `username=${credentials.username}&password=${credentials.password}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data;
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/auth/me');  // Notez /auth/me et non /auth/users/me
    return response.data;
  } catch (error) {
    localStorage.removeItem('access_token');
    return null;
  }
};
