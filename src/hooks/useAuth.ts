import apiClient from "../api/apiClient";


// ==========================================
// INSCRIPTION
// ==========================================

export const register = async (data: {
  email: string;
  password: string;
  full_name: string;
}) => {
  const response = await apiClient.post(
    "/auth/register",
    data
  );

  return response.data;
};


// ==========================================
// CONNEXION
// ==========================================

export const login = async (credentials: {
  username: string;
  password: string;
}) => {

  const formData = new URLSearchParams();

  formData.append(
    "username",
    credentials.username
  );

  formData.append(
    "password",
    credentials.password
  );

  const response = await apiClient.post(
    "/auth/token",
    formData,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};


// ==========================================
// UTILISATEUR CONNECTÉ
// ==========================================

export const getCurrentUser = async () => {

  const token = localStorage.getItem(
    "access_token"
  );

  if (!token) {
    throw new Error(
      "Aucun token d'authentification"
    );
  }

  const response = await apiClient.get(
    "/auth/me"
  );

  return response.data;
};