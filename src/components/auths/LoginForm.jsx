import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email, password);
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="alert-error" role="alert">{error}</div>}
      <div>
        <label className="label" htmlFor="login-email">Adresse email</label>
        <input id="login-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" className="input" required />
      </div>
      <div>
        <label className="label" htmlFor="login-password">Mot de passe</label>
        <div className="relative">
          <input id="login-password" type={show ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input pr-12" required />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-xs font-bold text-brand-600 hover:text-brand-700">
            {show ? 'Masquer' : 'Afficher'}
          </button>
        </div>
      </div>
      <button type="submit" disabled={busy} className="btn-primary w-full !py-3">
        {busy ? 'Connexion en cours...' : 'Se connecter'}
      </button>
      <p className="text-center text-xs text-ink-700/50">Connexion securisee sur cet appareil.</p>
    </form>
  );
}
