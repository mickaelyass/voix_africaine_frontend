import { useState } from 'react';
import LivreForm from '../components/livres/LivreForm';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddLivrePage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLivreSubmit = async (livreData) => {
    setIsSubmitting(true);
    setError('');
    try {
      const token = localStorage.getItem('access_token');
      const dataToSend = { ...livreData, created_by: user?.id };
      await axios.post(API_URL + '/livres/', dataToSend, { headers: { Authorization: 'Bearer ' + token } });
      navigate('/dashboard/list-livre-public');
    } catch (error) {
      setError(error.response?.data?.detail || 'Une erreur est survenue lors de la creation du livre');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/dashboard/list-livre-public" className="text-sm font-bold text-brand-600 hover:underline">Retour au catalogue</Link>
      <div className="page-header">
        <div>
          <p className="eyebrow">Nouveau recit</p>
          <h1 className="page-title">Publier un livre audio</h1>
          <p className="page-subtitle">Decrivez l ouvrage : les chapitres et les enregistrements viendront ensuite, chapitre par chapitre.</p>
        </div>
      </div>
      {error && <div className="alert-error" role="alert">{error}</div>}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card"><div className="card-body">
          <LivreForm onSubmit={handleLivreSubmit} isSubmitting={isSubmitting} />
        </div></div>
        <aside className="space-y-4">
          <div className="card"><div className="card-body">
            <p className="font-display text-base font-bold text-ink-900">Conseils de publication</p>
            <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-ink-700/70">
              <li><strong className="text-ink-900">1.</strong> Un titre court et memorable.</li>
              <li><strong className="text-ink-900">2.</strong> Le nom exact de l auteur.</li>
              <li><strong className="text-ink-900">3.</strong> Un resume qui donne envie d ecouter.</li>
            </ul>
          </div></div>
          <div className="relative overflow-hidden rounded-2xl bg-ink-950 p-5 text-white">
            <div className="hero-vignette absolute inset-0" />
            <p className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">Apres publication</p>
            <p className="relative mt-2 text-sm leading-relaxed text-white/75">Ajoutez les chapitres depuis la fiche du livre, puis enregistrez chaque audio au micro.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AddLivrePage;
