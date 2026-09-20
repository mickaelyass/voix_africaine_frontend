import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RegisterForm from '../components/auths/RegisterForm';
import AuthLayout from '../components/layout/AuthLayout';

export default function RegisterPage() {
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
      title="Creez votre compte conteur"
      subtitle="Gratuit, en une minute. Vous avez deja un compte ?"
      switchTo="/login" switchLabel="Connectez-vous."
      sideTitle="Pretez votre oreille, puis votre voix."
      sideText="Ecoutez les livres audio du continent, reagissez a la seconde pres et — quand vous etes pret — enregistrez votre premier chapitre au micro."
    >
      <RegisterForm onSuccess={() => navigate('/dashboard')} />
    </AuthLayout>
  );
}
