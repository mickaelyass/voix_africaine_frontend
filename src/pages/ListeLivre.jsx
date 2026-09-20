import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import LivreCard from '../components/livres/LivreCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ListeLivre = () => {
  const [livres, setLivres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const token = localStorage.getItem('access_token');
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDeleteLivre = async (id) => {
    if (!window.confirm('Confirmer la suppression de ce livre ?')) return;
    try {
      await axios.delete(API_URL + '/livres/' + id, { headers: { Authorization: 'Bearer ' + token } });
      fetchLivres();
      navigate('/dashboard/list-livre-public');
    } catch (error) {
      console.error('Erreur suppression :', error.response?.data || error);
    }
  };

  const fetchLivres = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL + '/livres/public/');
      setLivres(res.data);
    } catch (err) {
      console.error('Erreur de chargement :', err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => { fetchLivres(); }, [fetchLivres]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return livres;
    return livres.filter((l) => (l.titre + ' ' + l.auteur + ' ' + (l.description || '')).toLowerCase().includes(q));
  }, [livres, query]);

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div>
          <p className="eyebrow">Bibliotheque</p>
          <h1 className="page-title">Livres audio disponibles</h1>
          <p className="page-subtitle">{livres.length} recit(s) publie(s) — choisissez une couverture pour ouvrir les chapitres et lancer l ecoute.</p>
        </div>
        {user?.role === 'admin' && <button onClick={() => navigate('/dashboard/ajouter-livre')} className="btn-primary shrink-0">+ Nouveau livre</button>}
      </div>
      <div className="card"><div className="card-body flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3M10 18a8 8 0 110-16 8 8 0 010 16z" /></svg>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un titre, un auteur..." className="input !pl-10" />
        </div>
        <button onClick={fetchLivres} className="btn-secondary shrink-0">Actualiser</button>
      </div></div>
      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="h-64 animate-pulse rounded-2xl bg-ink-900/5" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p className="font-display text-lg font-bold text-ink-900">{livres.length === 0 ? 'Aucun livre disponible pour le moment.' : 'Aucun resultat pour cette recherche.'}</p>
          <p className="mt-1 text-sm text-ink-700/60">Essayez un autre mot-cle ou revenez plus tard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((livre) => <LivreCard key={livre.id} livre={livre} onDelete={handleDeleteLivre} />)}
        </div>
      )}
    </div>
  );
};

export default ListeLivre;
