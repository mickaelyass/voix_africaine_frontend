import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auths/LoginForm';
import AuthLayout from '../components/layout/AuthLayout';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate('/dashboard', { replace: true });
  }, [user, loading, navigate]);

  if (loading || user) {
    return <div className="min-h-screen flex items-center justify-center bg-sand-50 text-ink-700">Chargement...</div>;
  }

  return (
    <AuthLayout
      title="Bon retour parmi les voix"
      subtitle="Connectez-vous pour reprendre votre ecoute. Pas encore de compte ?"
      switchTo="/register" switchLabel="Creez-en un."
      sideTitle="Chaque soir, une nouvelle histoire vous attend."
      sideText="Reprenez vos livres la ou vous les avez laisses, commentez les passages qui vous touchent et suivez les chapitres valides par nos administrateurs."
    >
      <LoginForm />
    </AuthLayout>
  );
}
