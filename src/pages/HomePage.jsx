import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PublicNav, { PublicFooter } from '../components/layout/PublicNav';

const COVERS = [
  { t: "L'enfant noir", a: 'Camara Laye', c: 'from-amber-500 to-orange-800', init: 'EN' },
  { t: 'Une si longue lettre', a: 'Mariama Ba', c: 'from-rose-500 to-red-900', init: 'SL' },
  { t: 'Le monde qui bascule', a: 'Chinua Achebe', c: 'from-emerald-500 to-teal-900', init: 'MS' },
  { t: 'Segou', a: 'Maryse Conde', c: 'from-violet-500 to-indigo-900', init: 'SG' },
];

function CoverFan() {
  return (
    <div className="relative mx-auto flex h-[420px] max-w-md items-end justify-center sm:h-[460px]">
      <div className="absolute -top-2 h-72 w-72 rounded-full bg-brand-500/30 blur-[90px]" />
      <div className="absolute bottom-10 h-40 w-[420px] rounded-[100%] bg-black/50 blur-2xl" />
      {COVERS.map((b, i) => {
        const rot = [-14, -5, 5, 14][i];
        const y = [26, 8, 8, 26][i];
        return (
          <div key={b.t} className="absolute w-40 animate-floaty sm:w-44" style={{ transform: 'rotate(' + rot + 'deg) translateY(' + y + 'px)', marginLeft: ((i - 1.5) * 92) + 'px', animationDelay: (i * 0.7) + 's', zIndex: 10 + i }}>
            <div className={'relative aspect-[3/4.4] overflow-hidden rounded-l-md rounded-r-2xl bg-gradient-to-br p-4 text-white shadow-2xl ring-1 ring-white/20 ' + b.c}>
              <div className="cover-spine absolute inset-0" />
              <p className="relative font-display text-4xl font-black opacity-90">{b.init}</p>
              <div className="absolute inset-x-4 bottom-4">
                <div className="mb-2 h-0.5 w-8 bg-gold-400" />
                <p className="font-display text-sm font-bold leading-tight">{b.t}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-white/70">{b.a}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="glass absolute -bottom-1 z-30 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-pop">
          <svg className="h-5 w-5 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </span>
        <span>
          <span className="flex items-end gap-[3px] text-gold-300">
            <span className="w-[3px] animate-eq-1 rounded-full bg-current" style={{ height: 18 }} />
            <span className="w-[3px] animate-eq-2 rounded-full bg-current" style={{ height: 18 }} />
            <span className="w-[3px] animate-eq-3 rounded-full bg-current" style={{ height: 18 }} />
          </span>
          <span className="mt-1 block text-xs font-bold text-white">En ecoute : Contes du Sahel</span>
        </span>
        <span className="ml-2 rounded-full bg-white/10 px-2 py-1 text-[11px] font-bold text-white/80">12:47</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-ink-950 text-white">
      <PublicNav />
      <section className="hero-vignette relative overflow-hidden">
        <div className="pattern-kente absolute inset-0 opacity-[0.35]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Bibliotheque orale africaine
            </p>
            <h1 className="text-balance mt-5 font-display text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Les grandes histoires d Afrique, <span className="bg-gradient-to-r from-brand-300 via-gold-300 to-brand-400 bg-clip-text text-transparent">racontees a voix haute.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70 sm:text-base">
              Ecoutez des livres africains lus par des voix humaines, chapitre apres chapitre. Commentez un passage precis et pretez votre voix.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {!user ? (
                <>
                  <Link to="/register" className="btn-primary !px-7 !py-3.5 !text-[15px]">Commencer gratuitement</Link>
                  <Link to="/login" className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/10">Se connecter</Link>
                </>
              ) : (
                <Link to="/dashboard" className="btn-primary !px-7 !py-3.5 !text-[15px]">Acceder a mon espace</Link>
              )}
            </div>
            <dl className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-6">
              <div><dd className="font-display text-3xl font-black">120+</dd><dd className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/50">Chapitres audio</dd></div>
              <div><dd className="font-display text-3xl font-black">100%</dd><dd className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/50">Voix humaines</dd></div>
              <div><dd className="font-display text-3xl font-black">0 E</dd><dd className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/50">Acces libre</dd></div>
            </dl>
          </div>
          <CoverFan />
        </div>
      </section>
      <section id="catalogue" className="bg-sand-50 py-16 text-ink-900">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">Catalogue vivant</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">Des recits qui portent la memoire du continent.</h2>
            {!user ? <Link to="/register" className="btn-secondary">Explorer apres inscription</Link> : <Link to="/dashboard/list-livre-public" className="btn-primary">Explorer le catalogue</Link>}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COVERS.map((b, i) => (
              <article key={b.t} className="card group overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-pop">
                <div className={'relative aspect-[16/9] bg-gradient-to-br p-5 text-white ' + b.c}>
                  <div className="cover-spine absolute inset-0" />
                  <p className="relative font-display text-3xl font-black">{b.init}</p>
                  <span className="absolute right-4 top-4 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-bold">Chap. {3 + i * 2}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[17px] font-bold leading-snug">{b.t}</h3>
                  <p className="mt-1 text-[13px] font-semibold uppercase tracking-wide text-ink-700/50">{b.a}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="badge-slate badge">Audio - FR</span>
                    <span className="text-[13px] font-bold text-brand-600">Ecouter</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="voix" className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 py-16">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300">Appel aux conteurs</p>
            <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">Votre voix peut faire vivre un livre entier.</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">Enregistrez un chapitre au micro, envoyez-le, et rejoignez le cercle des voix une fois votre lecture validee.</p>
          </div>
          {!user ? <Link to="/register" className="rounded-xl bg-white px-7 py-3.5 text-[15px] font-black text-brand-700 shadow-2xl transition hover:-translate-y-0.5">Preter ma voix</Link> : <Link to="/dashboard" className="rounded-xl bg-white px-7 py-3.5 text-[15px] font-black text-brand-700 shadow-2xl transition hover:-translate-y-0.5">Ouvrir mon espace</Link>}
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

