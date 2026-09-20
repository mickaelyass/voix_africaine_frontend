import { Link } from 'react-router-dom';
import Brand from '../ui/Brand';

// Gabarit partagé des pages Connexion / Inscription : même logique, nouveau décor.
export default function AuthLayout({ title, subtitle, switchHint, switchTo, switchLabel, children, sideTitle, sideText }) {
  return (
    <div className="min-h-screen bg-sand-50 lg:grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink-950 text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="hero-vignette absolute inset-0" />
        <div className="pattern-kente absolute inset-0 opacity-30" />
        <div className="relative flex items-center justify-between">
          <Brand light />
          <Link to="/" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white">
            Retour accueil
          </Link>
        </div>
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300">
            Rejoignez le cercle des voix
          </p>
          <h2 className="mt-4 font-display text-4xl font-black leading-tight xl:text-5xl">{sideTitle}</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">{sideText}</p>
          <div className="mt-8 flex items-center gap-3">
            <span className="flex -space-x-2">
              {['A', 'M', 'K'].map((l) => (
                <span key={l} className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-xs font-black ring-2 ring-ink-950">{l}</span>
              ))}
            </span>
            <p className="text-sm text-white/60">Des conteurs de Dakar a Abidjan<br />lisent deja chaque semaine.</p>
          </div>
        </div>
        <p className="relative text-xs text-white/40">Voix Africaine — la bibliotheque orale du continent.</p>
      </div>
      <div className="flex flex-col px-4 py-8 sm:px-8 lg:justify-center lg:px-16">
        <div className="mb-8 lg:hidden"><Brand /></div>
        <div className="mx-auto w-full max-w-md">
          <h1 className="font-display text-3xl font-black tracking-tight text-ink-900 sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-ink-700/70">{subtitle} <Link to={switchTo} className="font-bold text-brand-600 hover:text-brand-700 hover:underline">{switchLabel}</Link></p>
          {switchHint && <p className="mt-1 text-xs text-ink-700/50">{switchHint}</p>}
          <div className="card mt-6"><div className="card-body">{children}</div></div>
        </div>
      </div>
    </div>
  );
}
