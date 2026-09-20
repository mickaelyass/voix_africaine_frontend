import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Brand from '../ui/Brand';

export default function PublicNav({ cta = true }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button type="button" onClick={() => navigate('/')} aria-label="Accueil Voix Africaine">
          <Brand light />
        </button>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-white/70 md:flex">
          <a href="#catalogue" className="transition hover:text-white">Catalogue</a>
          <a href="#experience" className="transition hover:text-white">Expérience</a>
          <a href="#voix" className="transition hover:text-white">Contribuer</a>
        </nav>
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white">
                Connexion
              </Link>
              {cta && (
                <Link to="/register" className="btn-primary !px-5">
                  Créer un compte
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 6l6 6-6 6M5 12h14" /></svg>
                </Link>
              )}
            </>
          ) : (
            <Link to="/dashboard" className="btn-primary !px-5">Ouvrir mon espace</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="bg-ink-950 text-white/60">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Brand light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            La bibliothèque orale du continent : des livres africains racontés par des voix d&apos;ici, chapitre après chapitre.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> 100% voix humaines
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Explorer</p>
          <ul className="mt-3 space-y-2 text-sm font-medium">
            <li><a href="#catalogue" className="hover:text-white">Catalogue</a></li>
            <li><a href="#experience" className="hover:text-white">Écoute</a></li>
            <li><a href="#voix" className="hover:text-white">Devenir conteur</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Compte</p>
          <ul className="mt-3 space-y-2 text-sm font-medium">
            <li><Link to="/login" className="hover:text-white">Connexion</Link></li>
            <li><Link to="/register" className="hover:text-white">Inscription</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Espace personnel</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Voix Africaine — Tous droits réservés.</p>
          <p className="text-white/40">Fait avec passion pour les histoires d&apos;Afrique.</p>
        </div>
      </div>
    </footer>
  );
}
