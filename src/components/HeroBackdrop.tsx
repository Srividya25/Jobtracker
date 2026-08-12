// Subtle, motion-light decorative backdrop for hero headers.
// Pure CSS (no images, no heavy animation) and adapts to light/dark via theme vars.
export default function HeroBackdrop({ className = '' }: { className?: string }) {
  return (
    <div className={`hero-backdrop ${className}`} aria-hidden="true">
      <style>{`
        .hero-backdrop {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .hb-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(48px);
          background: var(--hero-text);
          opacity: 0.1;
          animation: hbDrift 18s ease-in-out infinite alternate;
        }
        .hb-1 { width: 340px; height: 340px; top: -130px; right: 6%; }
        .hb-2 { width: 280px; height: 280px; bottom: -160px; left: 4%; animation-delay: -6s; }
        .hb-3 { width: 180px; height: 180px; top: -30px; left: 32%; opacity: 0.06; animation-delay: -12s; }
        @keyframes hbDrift {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to { transform: translate3d(26px, 20px, 0) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hb-blob { animation: none; }
        }
      `}</style>
      <div className="hb-blob hb-1" />
      <div className="hb-blob hb-2" />
      <div className="hb-blob hb-3" />
    </div>
  )
}
