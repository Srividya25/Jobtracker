export default function AuthScene() {
  return (
    <div className="auth-scene" aria-hidden="true">
      <style>{`
        .auth-scene {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.9;
        }
        .auth-scene svg { width: 100%; height: 100%; display: block; }
        .as-bob   { animation: asBob 4.5s ease-in-out infinite alternate; }
        .as-bob2  { animation: asBob 6s ease-in-out 0.5s infinite alternate; }
        .as-doc   { animation: asDoc 6.5s linear infinite; }
        .as-doc2  { animation: asDoc 6.5s linear 2.1s infinite; }
        .as-doc3  { animation: asDoc 6.5s linear 4.2s infinite; }
        .as-plane { animation: asPlane 9s linear infinite; }
        .as-card  { animation: asCard 6s ease-in-out infinite; }
        .as-pop   { transform-box: fill-box; transform-origin: center; animation: asPop 1.6s ease-in-out infinite; }
        .as-steam { animation: asSteam 2.4s ease-out infinite; }
        .as-steam2{ animation: asSteam 2.4s ease-out 0.8s infinite; }
        .as-tw    { animation: asTw 3s ease-in-out infinite; }
        .as-tw2   { animation: asTw 3s ease-in-out 0.9s infinite; }
        .as-tw3   { animation: asTw 3s ease-in-out 1.8s infinite; }
        @keyframes asBob { from { transform: translateY(0); } to { transform: translateY(-8px); } }
        @keyframes asDoc {
          0%   { transform: translateX(-200px); opacity: 0; }
          12%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(540px); opacity: 0; }
        }
        @keyframes asPlane {
          0%   { transform: translateX(-160px) translateY(0); }
          25%  { transform: translateX(300px) translateY(-14px); }
          50%  { transform: translateX(760px) translateY(4px); }
          75%  { transform: translateX(1220px) translateY(-12px); }
          100% { transform: translateX(1420px) translateY(0); }
        }
        @keyframes asCard {
          0%   { transform: translate(0, 0); }
          22%  { transform: translate(0, -10px); }
          45%  { transform: translate(44px, -10px); }
          68%  { transform: translate(88px, 0); }
          100% { transform: translate(88px, 0); }
        }
        @keyframes asPop {
          0%, 60%, 100% { transform: scale(0); }
          75%           { transform: scale(1.2); }
          88%           { transform: scale(1); }
        }
        @keyframes asSteam {
          0%   { transform: translateY(0); opacity: 0; }
          30%  { opacity: 0.8; }
          100% { transform: translateY(-28px); opacity: 0; }
        }
        @keyframes asTw { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.9; } }
      `}</style>
      <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax meet">
        <path d="M0 342 Q 300 322 600 344 T 1200 342 L 1200 400 L 0 400 Z" fill="var(--hero-text)" fillOpacity="0.12" />

        <g transform="translate(900, 122)">
          <rect width="150" height="118" rx="9" fill="var(--hero-text)" fillOpacity="0.28" />
          <rect x="0" y="14" width="40" height="90" rx="6" fill="var(--hero-text)" fillOpacity="0.12" />
          <rect x="44" y="14" width="40" height="90" rx="6" fill="var(--hero-text)" fillOpacity="0.12" />
          <rect x="88" y="14" width="40" height="90" rx="6" fill="var(--hero-text)" fillOpacity="0.12" />
          <circle cx="20" cy="6.5" r="4" fill="var(--hero-text)" fillOpacity="0.7" />
          <circle cx="64" cy="6.5" r="4" fill="var(--hero-text)" fillOpacity="0.7" />
          <circle cx="108" cy="6.5" r="4" fill="var(--hero-text)" fillOpacity="0.7" />
          <g className="as-card">
            <rect x="5" y="22" width="30" height="74" rx="7" fill="var(--hero-text)" fillOpacity="0.92" />
            <rect x="11" y="34" width="18" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.55" />
            <rect x="11" y="44" width="18" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.45" />
            <rect x="11" y="54" width="12" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.45" />
          </g>
          <path d="M102 60 l9 9 l18 -21" fill="none" stroke="var(--hero-text)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="as-pop" style={{ animationDelay: '1.2s' }} />
        </g>

        <g className="as-bob2" transform="translate(1020, 248)">
          <rect width="118" height="80" rx="14" fill="var(--hero-text)" fillOpacity="0.4" />
          <path d="M38 0 v-16 a 12 12 0 0 1 42 0 v16" fill="none" stroke="var(--hero-text)" strokeWidth="9" strokeLinecap="round" fillOpacity="0.7" />
          <rect x="50" y="-5" width="18" height="10" rx="5" fill="var(--hero-text)" fillOpacity="0.7" />
          <path d="M34 52 l16 16 l34 -36" fill="none" stroke="var(--hero-text)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="as-pop" style={{ animationDelay: '1.6s' }} />
        </g>

        <g className="as-bob2" transform="translate(576, 104)">
          <rect width="72" height="94" rx="11" fill="var(--hero-text)" fillOpacity="0.92" />
          <rect x="11" y="14" width="50" height="9" rx="4.5" fill="var(--hero-text)" fillOpacity="0.55" />
          <rect x="11" y="30" width="50" height="7" rx="3.5" fill="var(--hero-text)" fillOpacity="0.45" />
          <rect x="11" y="42" width="36" height="7" rx="3.5" fill="var(--hero-text)" fillOpacity="0.45" />
          <path d="M20 70 l10 10 l24 -24" fill="none" stroke="var(--hero-text)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g className="as-bob">
          <rect x="700" y="214" width="80" height="86" rx="18" fill="var(--hero-text)" fillOpacity="0.92" />
          <path d="M730 214 v-10" stroke="var(--hero-text)" strokeWidth="6" strokeOpacity="0.8" />
          <rect x="728" y="200" width="24" height="16" rx="6" fill="var(--hero-text)" fillOpacity="0.8" />
          <circle cx="740" cy="166" r="34" fill="var(--hero-text)" fillOpacity="0.8" />
          <path d="M706 164 a34 34 0 0 1 68 0 v2 a34 34 0 0 0 -68 0 Z" fill="var(--hero-text)" fillOpacity="0.9" />
          <circle cx="728" cy="172" r="3.4" fill="var(--hero-text)" fillOpacity="0.9" />
          <circle cx="752" cy="172" r="3.4" fill="var(--hero-text)" fillOpacity="0.9" />
          <path d="M730 182 q10 8 20 0" fill="none" stroke="var(--hero-text)" strokeWidth="2.6" strokeLinecap="round" />
        </g>

        <rect x="560" y="238" width="380" height="22" rx="10" fill="var(--hero-text)" fillOpacity="0.45" />
        <rect x="588" y="260" width="20" height="66" rx="5" fill="var(--hero-text)" fillOpacity="0.3" />
        <rect x="880" y="260" width="20" height="66" rx="5" fill="var(--hero-text)" fillOpacity="0.3" />

        <g transform="rotate(-4 667 205)">
          <rect x="600" y="188" width="134" height="34" rx="4" fill="var(--hero-text)" fillOpacity="0.85" />
          <rect x="612" y="196" width="40" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.4" />
          <rect x="612" y="205" width="52" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.35" />
          <rect x="612" y="214" width="30" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.35" />
        </g>
        <rect x="592" y="222" width="150" height="9" rx="4" fill="var(--hero-text)" fillOpacity="0.6" />
        <rect x="602" y="226" width="130" height="1" fill="var(--hero-text)" fillOpacity="0.4" />

        <rect x="694" y="232" width="56" height="14" rx="7" fill="var(--hero-text)" fillOpacity="0.8" transform="rotate(24 722 239)" />
        <rect x="716" y="236" width="58" height="14" rx="7" fill="var(--hero-text)" fillOpacity="0.8" transform="rotate(-24 745 243)" />
        <circle cx="700" cy="244" r="10" fill="var(--hero-text)" fillOpacity="0.8" />
        <circle cx="756" cy="230" r="10" fill="var(--hero-text)" fillOpacity="0.8" />

        <rect x="846" y="210" width="26" height="26" rx="6" fill="var(--hero-text)" fillOpacity="0.92" />
        <path d="M872 216 a 9 9 0 0 1 0 14" fill="none" stroke="var(--hero-text)" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.9" />
        <path d="M856 202 c-3 -7 3 -11 0 -18" fill="none" stroke="var(--hero-text)" strokeWidth="2.5" strokeLinecap="round" className="as-steam" />
        <path d="M862 204 c-3 -7 3 -11 0 -18" fill="none" stroke="var(--hero-text)" strokeWidth="2.5" strokeLinecap="round" className="as-steam2" />

        <g className="as-doc" transform="translate(0, 168)">
          <rect width="36" height="48" rx="7" fill="var(--hero-text)" fillOpacity="0.9" />
          <rect x="8" y="11" width="20" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.55" />
          <rect x="8" y="21" width="20" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.45" />
          <rect x="8" y="31" width="13" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.45" />
        </g>
        <g className="as-doc2" transform="translate(0, 226)">
          <rect width="32" height="44" rx="7" fill="var(--hero-text)" fillOpacity="0.75" />
          <rect x="7" y="10" width="18" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.5" />
          <rect x="7" y="20" width="18" height="5" rx="2.5" fill="var(--hero-text)" fillOpacity="0.45" />
        </g>

        <g className="as-plane" transform="translate(0, 320)">
          <path d="M0 14 L62 0 L44 58 L28 40 L10 44 Z" fill="var(--hero-text)" fillOpacity="0.9" />
          <path d="M28 40 L62 0" fill="none" stroke="var(--hero-text)" strokeOpacity="0.5" strokeWidth="3" />
        </g>

        <path d="M640 90 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="var(--hero-text)" className="as-tw" />
        <path d="M520 330 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="var(--hero-text)" className="as-tw2" />
        <path d="M360 60 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="var(--hero-text)" className="as-tw3" />
      </svg>
    </div>
  )
}
