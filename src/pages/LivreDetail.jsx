import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ListeChapitres from './ListeChapitres';

const LivreDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [livre, setLivre] = useState(null);
  const [chapitres, setChapitres] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('access_token');

  const fetchLivre = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + '/livres/' + id, { headers: { Authorization: 'Bearer ' + token } });
      setLivre(res.data);
    } catch (error) { console.error(error); }
  }, [id, token, API_URL]);

  const fetchChapitres = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + '/chapitres/livre/' + id, { headers: { Authorization: 'Bearer ' + token } });
      setChapitres(res.data);
    } catch (error) { console.error(error); }
  }, [id, token, API_URL]);

  const deleteChapitre = async (chapitreId) => {
    if (!window.confirm('Confirmer la suppression de ce chapitre ?')) return;
    try {
      await axios.delete(API_URL + '/chapitres/' + chapitreId, { headers: { Authorization: 'Bearer ' + token } });
      fetchChapitres();
    } catch (error) { console.error(error.response?.data || error); }
  };

  useEffect(() => { fetchLivre(); fetchChapitres(); }, [fetchChapitres, fetchLivre]);

  const toggleChapitrePublic = async (chapitreId) => {
    try {
      await axios.patch(API_URL + '/chapitres/' + chapitreId + '/toggle-public', {}, { headers: { Authorization: 'Bearer ' + token } });
      fetchChapitres();
    } catch (error) { console.error(error.response?.data || error); }
  };

  if (!livre) return <div className="py-16 text-center text-ink-700/60">Chargement du livre...</div>;

  return (
    <div className="space-y-6">
      <Link to="/dashboard/list-livre-public" className="text-sm font-bold text-brand-600 hover:underline">Retour au catalogue</Link>
      <section className="relative overflow-hidden rounded-3xl bg-ink-950 text-white">
        <div className="hero-vignette absolute inset-0" />
        <div className="pattern-kente absolute inset-0 opacity-20" />
        <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row">
          <span className="relative grid h-44 w-36 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 font-display text-6xl font-black shadow-2xl ring-1 ring-white/20">
            <span className="cover-spine absolute inset-0" />{(livre.titre || 'V').slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-gold badge">Livre audio</span>
              <span className="badge rounded-full bg-white/10 text-white/80">{chapitres.length} chapitre(s)</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-black leading-tight sm:text-4xl">{livre.titre}</h1>
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-gold-300">{livre.auteur}</p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70">{livre.description || 'Pas de description disponible.'}</p>
            {/* Tout utilisateur connecte peut creer un chapitre, puis
                l'enregistrer au micro depuis la fiche du livre. Seules les
                actions de suppression restent reservees aux administrateurs. */}
            {livre?.id && user && (
              <Link to={'/dashboard/livres/' + livre.id + '/ajouter-chapitre'} className="btn-primary mt-5">+ Ajouter un chapitre</Link>
            )}
          </div>
        </div>
      </section>
      <ListeChapitres chapitres={chapitres} user={user} onDelete={deleteChapitre} onTogglePublic={toggleChapitrePublic} onChapitresUpdated={fetchChapitres} />
    </div>
  );
};

export default LivreDetail;
