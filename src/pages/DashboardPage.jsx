import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import Sidebar from '../components/livres/Sidebar';
import Brand from '../components/ui/Brand';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const initial = (user?.full_name || user?.email || 'V').trim().charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <header className="sticky top-0 z-30 border-b border-ink-900/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={() => setIsOpen(true)} className="btn-ghost -ml-2 px-2 py-2 md:hidden" aria-label="Ouvrir le menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <Brand compact={false} />
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className={user?.role === 'admin' ? 'badge-brand' : 'badge-slate'}>
              {user?.role === 'admin' ? 'Admin' : 'Lecteur'}
            </span>
            <span className="hidden items-center gap-2 rounded-xl bg-sand-100 py-1.5 pl-1.5 pr-3 sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-black text-white">{initial}</span>
              <span className="max-w-[160px] truncate text-[13px] font-bold text-ink-900">{user?.full_name || user?.email}</span>
            </span>
            <button type="button" onClick={logout} className="btn-secondary !py-2">Deconnexion</button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-start gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-24 card overflow-hidden"><Sidebar user={user} /></div>
        </aside>
        <div className={'fixed inset-0 z-40 bg-ink-950/40 transition-opacity md:hidden ' + (isOpen ? 'opacity-100' : 'pointer-events-none opacity-0')} onClick={() => setIsOpen(false)} />
        <aside className={'fixed inset-y-0 left-0 z-50 w-72 transform border-r border-ink-900/10 bg-white shadow-2xl transition-transform duration-300 md:hidden ' + (isOpen ? 'translate-x-0' : '-translate-x-full')}>
          <div className="flex items-center justify-end px-3 pt-3">
            <button type="button" onClick={() => setIsOpen(false)} className="btn-ghost px-2 py-2" aria-label="Fermer">X</button>
          </div>
          <Sidebar user={user} onNavigate={() => setIsOpen(false)} />
        </aside>
        <main className="min-w-0 flex-1 pb-4"><Outlet /></main>
      </div>
      <footer className="border-t border-ink-900/10 bg-white">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-ink-700/60 sm:flex-row sm:px-6 lg:px-8">
          <p>Voix Africaine — Tous droits reserves.</p>
          <p className="text-xs">Chaque ecoute fait vivre une histoire.</p>
        </div>
      </footer>
    </div>
  );
}
