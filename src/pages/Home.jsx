import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GRADS = ['from-amber-500 to-orange-800', 'from-rose-500 to-red-900', 'from-emerald-500 to-teal-900', 'from-violet-500 to-indigo-900'];

const Home = () => {
  const { user } = useAuth();
  const API_URL = process.env.REACT_APP_API_URL;
  const [livres, setLivres] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchLivres = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const res = await axios.get(API_URL + '/livres/public/', { headers: { Authorization: 'Bearer ' + token } });
        setLivres(res.data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchLivres();
  }, [API_URL]);

  const first = livres[0];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-ink-950 p-6 text-white sm:p-8">
        <div className="hero-vignette absolute inset-0" />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300">Heureux de vous revoir</p>
          <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">Bonjour, {(user?.full_name || 'Conteur').split(' ')[0]}.</h2>
          <p className="mt-2 text-sm text-white/70">Connecte en tant que <strong className="text-white">{user?.email}</strong></p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => navigate('/dashboard/list-livre-public')} className="btn-primary">Continuer ma lecture</button>
            {user?.role === 'admin' && <button onClick={() => navigate('/dashboard/ajouter-livre')} className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold hover:bg-white/15">Ajouter un livre</button>}
          </div>
        </div>
      </section>
      <section className="card"><div className="card-body">
        {loading ? <div className="h-24 animate-pulse rounded-2xl bg-ink-900/5" /> : first ? (
          <button onClick={() => navigate('/dashboard/livre/' + first.id)} className="flex w-full flex-col gap-4 rounded-2xl bg-sand-50 p-4 text-left sm:flex-row sm:items-center">
            <span className={'grid h-24 w-20 shrink-0 place-items-center rounded-xl bg-gradient-to-br font-display text-2xl font-black text-white ' + GRADS[0]}>{(first.titre || 'V').slice(0, 1)}</span>
            <span className="min-w-0 flex-1">
              <span className="badge-brand">A decouvrir</span>
              <span className="mt-1 block truncate font-display text-xl font-black text-ink-900">{first.titre}</span>
              <span className="block text-xs font-bold uppercase tracking-wide text-ink-700/50">{first.auteur}</span>
            </span>
            <span className="btn-primary shrink-0">Ecouter</span>
          </button>
        ) : <p className="empty-state">Aucun livre pour le moment.</p>}
      </div></section>
      <section>
        <div className="mb-3 flex items-end justify-between">
          <h3 className="section-title">Recits recents</h3>
          <button onClick={() => navigate('/dashboard/list-livre-public')} className="text-sm font-bold text-brand-600 hover:underline">Voir plus</button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {livres.slice(0, 6).map((l, i) => (
            <button key={l.id} onClick={() => navigate('/dashboard/livre/' + l.id)} className="card overflow-hidden text-left transition hover:-translate-y-1 hover:shadow-pop">
              <div className={'flex h-24 items-end bg-gradient-to-br p-4 text-white ' + GRADS[i % GRADS.length]}>
                <span className="font-display text-3xl font-black">{(l.titre || 'V').slice(0, 1)}</span>
              </div>
              <div className="p-4">
                <p className="truncate font-display text-[16px] font-bold">{l.titre}</p>
                <p className="text-xs font-bold uppercase tracking-wide text-ink-700/50">{l.auteur}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

