import { useEffect, useState } from 'react';

export function Equalizer({ active = true, className = '' }) {
  if (!active) return null;
  return (
    <span className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      <span className="w-[3px] rounded-full bg-current animate-eq-1" style={{ height: 18 }} />
      <span className="w-[3px] rounded-full bg-current animate-eq-2" style={{ height: 18 }} />
      <span className="w-[3px] rounded-full bg-current animate-eq-3" style={{ height: 18 }} />
    </span>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-xl bg-ink-900/10 ${className}`} />;
}

export function EmptyState({ icon, title, hint, action }) {
  return (
    <div className="empty-state">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-2xl">{icon || '📚'}</div>
      <p className="font-display text-lg font-bold text-ink-900">{title}</p>
      {hint && <p className="mx-auto mt-1 max-w-md text-sm text-ink-700/60">{hint}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

export function Stat({ label, value, sub }) {
  return (
    <div className="card card-body">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-700/50">{label}</p>
      <p className="mt-1 font-display text-3xl font-black text-ink-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-700/60">{sub}</p>}
    </div>
  );
}

// Compteur animé (pure présentation)
export function CountUp({ to = 0, duration = 900 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{v.toLocaleString('fr-FR')}</>;
}
