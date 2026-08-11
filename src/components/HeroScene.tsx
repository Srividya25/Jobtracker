export default function HeroScene({
  className = '',
  variant = 'full',
}: {
  className?: string
  variant?: 'full' | 'right'
}) {
  return (
    <div className={`hero-scene hero-scene--${variant} ${className}`} aria-hidden="true">
      <style>{`
        .hero-scene {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.75;
        }
        .hero-scene--right {
          left: auto;
          width: 62%;
        }
        .hero-scene svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .hs-bob   { animation: hsBob 4.5s ease-in-out infinite alternate; }
        .hs-bob2  { animation: hsBob 6s ease-in-out 0.5s infinite alternate; }
        .hs-doc   { animation: hsDoc 6.5s linear infinite; }
        .hs-doc2  { animation: hsDoc 6.5s linear 2.1s infinite; }
        .hs-doc3  { animation: hsDoc 6.5s linear 4.2s infinite; }
        .hs-plane { animation: hsPlane 9s linear infinite; }
        .hs-card  { animation: hsCard 6s ease-in-out infinite; }
        .hs-pop   { transform-box: fill-box; transform-origin: center; animation: hsPop 1.6s ease-in-out infinite; }
        .hs-steam { animation: hsSteam 2.4s ease-out infinite; }
        .hs-steam2{ animation: hsSteam 2.4s ease-out 0.8s infinite; }
        .hs-tw    { animation: hsTw 3s ease-in-out infinite; }
        .hs-tw2   { animation: hsTw 3s ease-in-out 0.9s infinite; }
        .hs-tw3   { animation: hsTw 3s ease-in-out 1.8s infinite; }
        @keyframes hsBob { from { transform: translateY(0); } to { transform: translateY(-8px); } }
        @keyframes hsDoc {
          0%   { transform: translateX(-200px); opacity: 0; }
          12%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(540px); opacity: 0; }
        }
        @keyframes hsPlane {
          0%   { transform: translateX(-160px) translateY(0); }
          25%  { transform: translateX(300px) translateY(-14px); }
          50%  { transform: translateX(760px) translateY(4px); }
          75%  { transform: translateX(1220px) translateY(-12px); }
          100% { transform: translateX(1420px) translateY(0); }
        }
        @keyframes hsCard {
          0%   { transform: translate(0, 0); }
          22%  { transform: translate(0, -10px); }
          45%  { transform: translate(44px, -10px); }
          68%  { transform: translate(88px, 0); }
          100% { transform: translate(88px, 0); }
        }
        @keyframes hsPop {
          0%, 60%, 100% { transform: scale(0); }
          75%           { transform: scale(1.2); }
          88%           { transform: scale(1); }
        }
        @keyframes hsSteam {
          0%   { transform: translateY(0); opacity: 0; }
          30%  { opacity: 0.8; }
          100% { transform: translateY(-28px); opacity: 0; }
        }
        @keyframes hsTw { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.9; } }
      `}</style>
      <svg viewBox="0 0 1200 400" preserveAspectRatio={variant === 'right' ? 'xMaxYMid slice' : 'xMidYMid slice'}>
        {/* ground */}
        <path d="M0 342 Q 300 322 600 344 T 1200 342 L 1200 400 L 0 400 Z" fill="#d9bd8c" fillOpacity="0.30" />

        {/* kanban board (wall, right) */}
        <g transform="translate(900, 122)">
          <rect width="150" height="118" rx="9" fill="#c9a76b" fillOpacity="0.9" />
          <rect x="0" y="14" width="40" height="90" rx="6" fill="#fdf8ec" fillOpacity="0.55" />
          <rect x="44" y="14" width="40" height="90" rx="6" fill="#fdf8ec" fillOpacity="0.55" />
          <rect x="88" y="14" width="40" height="90" rx="6" fill="#fdf8ec" fillOpacity="0.55" />
          <circle cx="20" cy="6.5" r="4" fill="#5b3a1e" fillOpacity="0.7" />
          <circle cx="64" cy="6.5" r="4" fill="#5b3a1e" fillOpacity="0.7" />
          <circle cx="108" cy="6.5" r="4" fill="#5b3a1e" fillOpacity="0.7" />
          <g className="hs-card">
            <rect x="5" y="22" width="30" height="74" rx="7" fill="#fffdf5" fillOpacity="0.95" />
            <rect x="11" y="34" width="18" height="5" rx="2.5" fill="#8a5a2b" fillOpacity="0.8" />
            <rect x="11" y="44" width="18" height="5" rx="2.5" fill="#8a5a2b" fillOpacity="0.6" />
            <rect x="11" y="54" width="12" height="5" rx="2.5" fill="#8a5a2b" fillOpacity="0.6" />
          </g>
          <path d="M102 60 l9 9 l18 -21" fill="none" stroke="#221c13" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="hs-pop" style={{ animationDelay: '1.2s' }} />
        </g>

        {/* briefcase (floor, right) */}
        <g className="hs-bob2" transform="translate(1020, 248)">
          <rect width="118" height="80" rx="14" fill="#8a5a2b" fillOpacity="0.95" />
          <path d="M38 0 v-16 a 12 12 0 0 1 42 0 v16" fill="none" stroke="#5b3a1e" strokeWidth="9" strokeLinecap="round" />
          <rect x="50" y="-5" width="18" height="10" rx="5" fill="#5b3a1e" fillOpacity="0.8" />
          <path d="M34 52 l16 16 l34 -36" fill="none" stroke="#fffdf5" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="hs-pop" style={{ animationDelay: '1.6s' }} />
        </g>

        {/* floating application card (above laptop) */}
        <g className="hs-bob2" transform="translate(576, 104)">
          <rect width="72" height="94" rx="11" fill="#fffdf5" fillOpacity="0.92" />
          <rect x="11" y="14" width="50" height="9" rx="4.5" fill="#8a5a2b" fillOpacity="0.8" />
          <rect x="11" y="30" width="50" height="7" rx="3.5" fill="#8a5a2b" fillOpacity="0.55" />
          <rect x="11" y="42" width="36" height="7" rx="3.5" fill="#8a5a2b" fillOpacity="0.55" />
          <path d="M20 70 l10 10 l24 -24" fill="none" stroke="#221c13" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* character sitting at desk (center-right) */}
        <g className="hs-bob">
          <rect x="700" y="214" width="80" height="86" rx="18" fill="#fffdf5" fillOpacity="0.95" />
          <path d="M730 214 v-10" stroke="#e3cba4" strokeWidth="6" />
          <rect x="728" y="200" width="24" height="16" rx="6" fill="#e8c9a0" />
          <circle cx="740" cy="166" r="34" fill="#e8c9a0" />
          <path d="M706 164 a34 34 0 0 1 68 0 v2 a34 34 0 0 0 -68 0 Z" fill="#221c13" />
          <circle cx="728" cy="172" r="3.4" fill="#221c13" />
          <circle cx="752" cy="172" r="3.4" fill="#221c13" />
          <path d="M730 182 q10 8 20 0" fill="none" stroke="#221c13" strokeWidth="2.6" strokeLinecap="round" />
        </g>

        {/* desk */}
        <rect x="560" y="238" width="380" height="22" rx="10" fill="#8a5a2b" fillOpacity="0.92" />
        <rect x="588" y="260" width="20" height="66" rx="5" fill="#5b3a1e" fillOpacity="0.85" />
        <rect x="880" y="260" width="20" height="66" rx="5" fill="#5b3a1e" fillOpacity="0.85" />

        {/* laptop */}
        <g transform="rotate(-4 667 205)">
          <rect x="600" y="188" width="134" height="34" rx="4" fill="#2b2117" />
          <rect x="612" y="196" width="40" height="5" rx="2.5" fill="#c9a76b" fillOpacity="0.8" />
          <rect x="612" y="205" width="52" height="5" rx="2.5" fill="#c9a76b" fillOpacity="0.6" />
          <rect x="612" y="214" width="30" height="5" rx="2.5" fill="#c9a76b" fillOpacity="0.6" />
        </g>
        <rect x="592" y="222" width="150" height="9" rx="4" fill="#3a2f24" />
        <rect x="602" y="226" width="130" height="1" fill="#5b4632" />

        {/* arms + hands on laptop */}
        <rect x="694" y="232" width="56" height="14" rx="7" fill="#e8c9a0" transform="rotate(24 722 239)" />
        <rect x="716" y="236" width="58" height="14" rx="7" fill="#e8c9a0" transform="rotate(-24 745 243)" />
        <circle cx="700" cy="244" r="10" fill="#e8c9a0" />
        <circle cx="756" cy="230" r="10" fill="#e8c9a0" />

        {/* mug with steam */}
        <rect x="846" y="210" width="26" height="26" rx="6" fill="#fffdf5" fillOpacity="0.95" />
        <path d="M872 216 a 9 9 0 0 1 0 14" fill="none" stroke="#fffdf5" strokeWidth="5" strokeLinecap="round" />
        <path d="M856 202 c-3 -7 3 -11 0 -18" fill="none" stroke="#fffdf5" strokeWidth="2.5" strokeLinecap="round" className="hs-steam" />
        <path d="M862 204 c-3 -7 3 -11 0 -18" fill="none" stroke="#fffdf5" strokeWidth="2.5" strokeLinecap="round" className="hs-steam2" />

        {/* documents flying toward laptop */}
        <g className="hs-doc" transform="translate(0, 168)">
          <rect width="36" height="48" rx="7" fill="#fffdf5" fillOpacity="0.9" />
          <rect x="8" y="11" width="20" height="5" rx="2.5" fill="#8a5a2b" fillOpacity="0.8" />
          <rect x="8" y="21" width="20" height="5" rx="2.5" fill="#8a5a2b" fillOpacity="0.6" />
          <rect x="8" y="31" width="13" height="5" rx="2.5" fill="#8a5a2b" fillOpacity="0.6" />
        </g>
        <g className="hs-doc2" transform="translate(0, 226)">
          <rect width="32" height="44" rx="7" fill="#f2e3c9" fillOpacity="0.9" />
          <rect x="7" y="10" width="18" height="5" rx="2.5" fill="#8a5a2b" fillOpacity="0.8" />
          <rect x="7" y="20" width="18" height="5" rx="2.5" fill="#8a5a2b" fillOpacity="0.6" />
        </g>

        {/* paper plane (left) */}
        <g className="hs-plane" transform="translate(0, 320)">
          <path d="M0 14 L62 0 L44 58 L28 40 L10 44 Z" fill="#fffdf5" fillOpacity="0.9" />
          <path d="M28 40 L62 0" fill="none" stroke="#8a5a2b" strokeOpacity="0.7" strokeWidth="3" />
        </g>

        {/* sparkles */}
        <path d="M640 90 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#fffdf5" className="hs-tw" />
        <path d="M520 330 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#fffdf5" className="hs-tw2" />
        <path d="M360 60 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#fffdf5" className="hs-tw3" />
      </svg>
    </div>
  )
}
