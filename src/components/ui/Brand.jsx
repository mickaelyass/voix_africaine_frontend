// Logo + wordmark Voix Africaine (SVG inline, sans asset externe)
export default function Brand({ compact = false, light = false }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-400 via-brand-600 to-ink-900 text-white shadow-pop">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v10m0 0a3 3 0 003-3V7a3 3 0 00-6 0v3a3 3 0 003 3zm-6 2a6 6 0 0012 0M12 19v2" />
        </svg>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-brand-500" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[17px] font-black tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
            Voix <span className="bg-gradient-to-r from-brand-500 to-gold-500 bg-clip-text text-transparent">Africaine</span>
          </span>
          <span className={`mt-1 text-[10px] font-bold uppercase tracking-[0.24em] ${light ? 'text-white/60' : 'text-ink-700/50'}`}>
            Livres audio
          </span>
        </span>
      )}
    </span>
  );
}
