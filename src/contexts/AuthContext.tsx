import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, register as registerService, getCurrentUser } from '../hooks/useAuth.';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; full_name: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        localStorage.removeItem('access_token');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginService({ username: email, password });
    localStorage.setItem('access_token', data.access_token);
    const userData = await getCurrentUser();
    setUser(userData);
  };

  const register = async (formData: { email: string; password: string; full_name: string }) => {
    await registerService(formData);
    await login(formData.email, formData.password);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}