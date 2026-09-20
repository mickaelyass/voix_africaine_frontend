import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const GRADS = ['from-amber-500 to-orange-800', 'from-rose-500 to-red-900', 'from-emerald-500 to-teal-900', 'from-violet-500 to-indigo-900', 'from-sky-500 to-blue-900', 'from-orange-500 to-amber-900'];

const LivreCard = ({ livre, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const grad = GRADS[String(livre.id || livre.titre || 'V').length % GRADS.length];
  const goToDetail = () => navigate('/dashboard/livre/' + livre.id);

  return (
    <article className="card group cursor-pointer overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-pop" onClick={goToDetail}>
      <div className={'relative flex h-36 items-end justify-between bg-gradient-to-br p-5 text-white ' + grad}>
        <div className="cover-spine absolute inset-0" />
        <span className="relative font-display text-5xl font-black opacity-90">{(livre.titre || 'V').slice(0, 1).toUpperCase()}</span>
        <span className="relative mb-1 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-bold backdrop-blur">Livre audio</span>
        <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-ink-900 opacity-0 shadow-lg transition group-hover:opacity-100">
          <svg className="h-4 w-4 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug text-ink-900">{livre.titre}</h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-700">{livre.auteur}</p>
        {livre.description && <p className="line-clamp-2 mt-2 text-sm leading-relaxed text-ink-700/70">{livre.description}</p>}
        <div className="mt-4 flex items-center justify-between border-t border-ink-900/10 pt-3.5">
          <span className="badge-slate badge">Chapitres audio</span>
          <span className="text-[13px] font-black text-brand-600">Ouvrir le livre</span>
        </div>
      </div>
      {user?.role === 'admin' && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(livre.id); }}
          className="btn-xs m-4 mt-0 border border-red-200 text-red-600 hover:bg-red-50"
        >
          Supprimer
        </button>
      )}
    </article>
  );
};

export default LivreCard;
