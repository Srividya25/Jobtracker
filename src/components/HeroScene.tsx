export default function HeroScene({ className = '' }: { className?: string }) {
  return (
    <div className={`hero-scene ${className}`} aria-hidden="true">
      <style>{`
        .hero-scene {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.55;
        }
        .hero-scene svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .hs-bob   { animation: hsBob 5s ease-in-out infinite alternate; }
        .hs-bob2  { animation: hsBob 7s ease-in-out infinite alternate; }
        .hs-doc   { animation: hsDoc 7s linear infinite; }
        .hs-doc2  { animation: hsDoc 7s linear 2.33s infinite; }
        .hs-doc3  { animation: hsDoc 7s linear 4.66s infinite; }
        .hs-plane { animation: hsPlane 9s linear infinite; }
        .hs-card  { animation: hsCard 6s ease-in-out infinite; }
        .hs-pop   { transform-box: fill-box; transform-origin: center; animation: hsPop 1.6s ease-in-out infinite; }
        .hs-spin  { transform-box: fill-box; transform-origin: center; animation: hsSpin 14s linear infinite; }
        .hs-tw    { animation: hsTw 3s ease-in-out infinite; }
        .hs-tw2   { animation: hsTw 3s ease-in-out 0.9s infinite; }
        .hs-tw3   { animation: hsTw 3s ease-in-out 1.8s infinite; }
        @keyframes hsBob { from { transform: translateY(0); } to { transform: translateY(-12px); } }
        @keyframes hsDoc {
          0%   { transform: translateX(-160px); opacity: 0; }
          10%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translateX(760px); opacity: 0; }
        }
        @keyframes hsPlane {
          0%   { transform: translateX(-160px) translateY(0); }
          25%  { transform: translateX(300px) translateY(-16px); }
          50%  { transform: translateX(760px) translateY(6px); }
          75%  { transform: translateX(1220px) translateY(-14px); }
          100% { transform: translateX(1420px) translateY(0); }
        }
        @keyframes hsCard {
          0%   { transform: translate(0, 0); }
          22%  { transform: translate(0, -14px); }
          45%  { transform: translate(90px, -14px); }
          68%  { transform: translate(180px, 0); }
          100% { transform: translate(180px, 0); }
        }
        @keyframes hsPop {
          0%, 60%, 100% { transform: scale(0); }
          75%           { transform: scale(1.2); }
          88%           { transform: scale(1); }
        }
        @keyframes hsSpin { to { transform: rotate(360deg); } }
        @keyframes hsTw { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.9; } }
      `}</style>
      <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
        {/* soft clouds + ground */}
        <ellipse cx="150" cy="348" rx="95" ry="28" fill="#fff" fillOpacity="0.10" />
        <ellipse cx="1050" cy="352" rx="120" ry="30" fill="#fff" fillOpacity="0.10" />
        <path d="M0 400 Q 300 340 600 392 T 1200 384 V 400 Z" fill="#fff" fillOpacity="0.09" />

        {/* application document (left) */}
        <g className="hs-bob" transform="translate(80, 96)">
          <rect width="120" height="150" rx="14" fill="#fff" fillOpacity="0.38" />
          <rect x="16" y="18" width="88" height="12" rx="6" fill="#3b2a7d" fillOpacity="0.45" />
          <rect x="16" y="40" width="88" height="10" rx="5" fill="#3b2a7d" fillOpacity="0.32" />
          <rect x="16" y="56" width="64" height="10" rx="5" fill="#3b2a7d" fillOpacity="0.32" />
          <path d="M30 104 l16 16 l40 -40" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.85" />
        </g>

        {/* clipboard with pencil (top center) */}
        <g className="hs-bob2" transform="translate(520, 34)">
          <rect x="10" y="10" width="70" height="100" rx="10" fill="#fff" fillOpacity="0.38" />
          <rect x="36" y="4" width="18" height="12" rx="4" fill="#fff" fillOpacity="0.7" />
          <rect x="26" y="34" width="38" height="8" rx="4" fill="#3b2a7d" fillOpacity="0.35" />
          <rect x="26" y="50" width="38" height="8" rx="4" fill="#3b2a7d" fillOpacity="0.28" />
          <rect x="26" y="66" width="26" height="8" rx="4" fill="#3b2a7d" fillOpacity="0.28" />
          <path d="M70 84 l10 22 24 -30" fill="none" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* briefcase (right) */}
        <g className="hs-bob2" transform="translate(930, 148)">
          <rect width="180" height="116" rx="20" fill="#fff" fillOpacity="0.42" />
          <path d="M48 0 v-20 a 12 12 0 0 1 84 0 v20" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" strokeOpacity="0.5" />
          <path d="M45 52 l20 20 l46 -46" fill="none" stroke="#4ade80" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" className="hs-pop" style={{ animationDelay: '1.2s' }} />
          <rect x="76" y="-6" width="28" height="12" rx="6" fill="#3b2a7d" fillOpacity="0.4" />
        </g>

        {/* documents flying into briefcase */}
        <g className="hs-doc" transform="translate(0, 130)">
          <rect width="34" height="46" rx="7" fill="#fff" fillOpacity="0.65" />
          <rect x="8" y="10" width="18" height="5" rx="2.5" fill="#3b2a7d" fillOpacity="0.5" />
          <rect x="8" y="20" width="18" height="5" rx="2.5" fill="#3b2a7d" fillOpacity="0.4" />
        </g>
        <g className="hs-doc2" transform="translate(0, 210)">
          <rect width="30" height="40" rx="7" fill="#fff" fillOpacity="0.65" />
          <rect x="7" y="9" width="16" height="5" rx="2.5" fill="#3b2a7d" fillOpacity="0.5" />
          <rect x="7" y="18" width="16" height="5" rx="2.5" fill="#3b2a7d" fillOpacity="0.4" />
        </g>
        <g className="hs-doc3" transform="translate(0, 300)">
          <rect width="38" height="50" rx="7" fill="#fff" fillOpacity="0.65" />
          <rect x="9" y="11" width="20" height="5" rx="2.5" fill="#3b2a7d" fillOpacity="0.5" />
          <rect x="9" y="21" width="20" height="5" rx="2.5" fill="#3b2a7d" fillOpacity="0.4" />
        </g>

        {/* paper plane */}
        <g className="hs-plane" transform="translate(0, 260)">
          <path d="M0 14 L62 0 L44 58 L28 40 L10 44 Z" fill="#fff" fillOpacity="0.75" />
          <path d="M28 40 L62 0" fill="none" stroke="#3b2a7d" strokeOpacity="0.5" strokeWidth="3" />
        </g>

        {/* mini kanban pipeline */}
        <g transform="translate(340, 226)">
          <rect x="0" y="18" width="64" height="112" rx="12" fill="#fff" fillOpacity="0.32" />
          <rect x="90" y="18" width="64" height="112" rx="12" fill="#fff" fillOpacity="0.32" />
          <rect x="180" y="18" width="64" height="112" rx="12" fill="#fff" fillOpacity="0.32" />
          <circle cx="32" cy="9" r="4.5" fill="#fff" fillOpacity="0.7" />
          <circle cx="122" cy="9" r="4.5" fill="#fff" fillOpacity="0.7" />
          <circle cx="212" cy="9" r="4.5" fill="#fff" fillOpacity="0.7" />
          <g className="hs-card">
            <rect x="10" y="30" width="44" height="86" rx="9" fill="#fff" fillOpacity="0.75" />
            <rect x="19" y="42" width="26" height="7" rx="3.5" fill="#3b2a7d" fillOpacity="0.5" />
            <rect x="19" y="55" width="26" height="7" rx="3.5" fill="#3b2a7d" fillOpacity="0.35" />
            <rect x="19" y="68" width="18" height="7" rx="3.5" fill="#3b2a7d" fillOpacity="0.35" />
          </g>
          <path d="M204 66 l12 12 l24 -28" fill="none" stroke="#4ade80" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="hs-pop" style={{ animationDelay: '1.4s' }} />
        </g>

        {/* spinning magnifier */}
        <g className="hs-spin" transform="translate(1140, 62)">
          <circle cx="0" cy="0" r="27" fill="none" stroke="#fff" strokeWidth="8" strokeOpacity="0.6" />
          <path d="M18 18 L34 34" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.6" />
        </g>

        {/* sparkles */}
        <path d="M214 66 l6 14 14 6 -14 6 -6 14 -6 -14 -14 -6 14 -6 Z" fill="#fff" className="hs-tw" />
        <path d="M742 96 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#fff" className="hs-tw2" />
        <path d="M672 330 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#fff" className="hs-tw3" />
      </svg>
    </div>
  )
}
