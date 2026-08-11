export default function AuthScene() {
  return (
    <div className="auth-scene" aria-hidden="true">
      <style>{`
        .auth-scene {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.92;
          z-index: 1;
        }
        .auth-scene svg { width: 100%; height: 100%; display: block; }
        .as-bob   { animation: asBob 4.5s ease-in-out infinite alternate; }
        .as-bob2  { animation: asBob 6s ease-in-out 0.6s infinite alternate; }
        .as-app   { transform-box: fill-box; transform-origin: center; }
        .as-app1  { animation: asApp1 7s ease-in-out infinite; }
        .as-app2  { animation: asApp2 8s ease-in-out 0.8s infinite; }
        .as-app3  { animation: asApp3 7.5s ease-in-out 1.6s infinite; }
        .as-app4  { animation: asApp4 8.5s ease-in-out 2.4s infinite; }
        .as-app5  { animation: asApp5 7.5s ease-in-out 3.2s infinite; }
        .as-app6  { animation: asApp6 8s ease-in-out 4s infinite; }
        .as-steam { animation: asSteam 2.4s ease-out infinite; }
        .as-steam2{ animation: asSteam 2.4s ease-out 0.8s infinite; }
        .as-tw    { animation: asTw 3s ease-in-out infinite; }
        .as-tw2   { animation: asTw 3s ease-in-out 1.4s infinite; }
        @keyframes asBob { from { transform: translateY(0); } to { transform: translateY(-6px); } }
        @keyframes asApp1 {
          0%   { transform: translate(20px, 15px) scale(0.55); opacity: 0; }
          14%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(800px, 185px) scale(1); opacity: 0; }
        }
        @keyframes asApp2 {
          0%   { transform: translate(1170px, 20px) scale(0.55); opacity: 0; }
          14%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(805px, 190px) scale(1); opacity: 0; }
        }
        @keyframes asApp3 {
          0%   { transform: translate(25px, 378px) scale(0.55); opacity: 0; }
          14%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(790px, 205px) scale(1); opacity: 0; }
        }
        @keyframes asApp4 {
          0%   { transform: translate(1170px, 378px) scale(0.55); opacity: 0; }
          14%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(810px, 200px) scale(1); opacity: 0; }
        }
        @keyframes asApp5 {
          0%   { transform: translate(220px, 8px) scale(0.55); opacity: 0; }
          14%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(795px, 180px) scale(1); opacity: 0; }
        }
        @keyframes asApp6 {
          0%   { transform: translate(960px, 8px) scale(0.55); opacity: 0; }
          14%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(805px, 195px) scale(1); opacity: 0; }
        }
        @keyframes asSteam {
          0%   { transform: translateY(0); opacity: 0; }
          30%  { opacity: 0.8; }
          100% { transform: translateY(-26px); opacity: 0; }
        }
        @keyframes asTw { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.85; } }
      `}</style>
      <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax meet">
        <defs>
          <radialGradient id="asGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--scene-ink, var(--hero-text))" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--scene-ink, var(--hero-text))" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path d="M0 356 Q 300 340 600 358 T 1200 356 L 1200 400 L 0 400 Z" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.10" />

        <path d="M900 70 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="var(--scene-ink, var(--hero-text))" className="as-tw" />
        <path d="M300 90 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="var(--scene-ink, var(--hero-text))" className="as-tw2" />

        <g className="as-bob">
          <rect x="654" y="206" width="76" height="54" rx="16" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.9" />
          <path d="M682 206 v-10" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="6" strokeOpacity="0.75" />
          <circle cx="684" cy="158" r="32" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.78" />
          <path d="M652 154 a32 32 0 0 1 64 0 v2 a32 32 0 0 0 -64 0 Z" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.88" />
          <circle cx="696" cy="163" r="3" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.88" />
          <circle cx="708" cy="163" r="3" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.88" />
          <rect x="686" y="157" width="13" height="10" rx="3" fill="none" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="2" strokeOpacity="0.8" />
          <rect x="703" y="157" width="13" height="10" rx="3" fill="none" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="2" strokeOpacity="0.8" />
          <path d="M699 162 h4" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="2" strokeOpacity="0.8" />
          <path d="M688 148 l2 -3 M706 148 l-2 -3" stroke="var(--scene-ink, var(--hero-text))" fillOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          <path d="M696 173 q5 4 10 0" fill="none" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.8" />
        </g>

        <g transform="translate(560, 252)">
          <rect width="440" height="18" rx="9" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.42" />
          <rect x="20" y="18" width="22" height="72" rx="6" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.28" />
          <rect x="398" y="18" width="22" height="72" rx="6" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.28" />
        </g>

        <g transform="translate(-30, 0)">
          <rect x="768" y="130" width="172" height="116" rx="12" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.85" />
          <rect x="782" y="144" width="144" height="88" rx="7" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.18" />
          <rect x="796" y="162" width="56" height="8" rx="4" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.5" />
          <rect x="796" y="178" width="40" height="8" rx="4" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.35" />
          <rect x="796" y="206" width="14" height="16" rx="3" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.65" />
          <rect x="818" y="196" width="14" height="26" rx="3" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.65" />
          <rect x="840" y="186" width="14" height="36" rx="3" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.65" />
          <rect x="862" y="194" width="14" height="28" rx="3" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.55" />
          <rect x="884" y="204" width="14" height="18" rx="3" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.55" />
          <path d="M908 170 l7 7 l14 -14" fill="none" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <rect x="866" y="246" width="16" height="12" rx="6" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.5" />
          <rect x="824" y="258" width="100" height="10" rx="5" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.5" />
          <ellipse cx="854" cy="192" rx="120" ry="100" fill="url(#asGlow)" />
        </g>

        <rect x="696" y="248" width="132" height="16" rx="7" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.82" />
        <rect x="704" y="252" width="116" height="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.4" />
        <rect x="704" y="258" width="116" height="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.4" />

        <rect x="844" y="248" width="24" height="30" rx="12" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.82" />
        <path d="M856 250 v11" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="2.5" strokeOpacity="0.55" />

        <g className="as-bob">
          <rect x="650" y="238" width="84" height="12" rx="6" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.65" transform="rotate(6 692 244)" />
          <rect x="650" y="252" width="84" height="12" rx="6" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.65" transform="rotate(-4 692 258)" />
          <circle cx="730" cy="246" r="9" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.7" />
          <circle cx="730" cy="258" r="9" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.7" />
        </g>

        <g className="as-app as-app1">
          <rect width="26" height="34" rx="7" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.9" />
          <rect x="5" y="8" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.55" />
          <rect x="5" y="15" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.45" />
          <rect x="5" y="22" width="10" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.45" />
        </g>
        <g className="as-app as-app2">
          <rect width="26" height="34" rx="7" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.9" />
          <rect x="5" y="8" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.55" />
          <rect x="5" y="15" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.45" />
          <path d="M7 27 l5 5 l9 -11" fill="none" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
        <g className="as-app as-app3">
          <rect width="26" height="34" rx="7" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.9" />
          <rect x="5" y="8" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.55" />
          <rect x="5" y="15" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.45" />
          <rect x="5" y="22" width="10" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.45" />
        </g>
        <g className="as-app as-app4">
          <rect width="26" height="34" rx="7" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.9" />
          <rect x="5" y="8" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.55" />
          <rect x="5" y="15" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.45" />
          <path d="M7 27 l5 5 l9 -11" fill="none" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
        <g className="as-app as-app5">
          <rect width="26" height="34" rx="7" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.9" />
          <rect x="5" y="8" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.55" />
          <rect x="5" y="15" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.45" />
          <rect x="5" y="22" width="10" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.45" />
        </g>
        <g className="as-app as-app6">
          <rect width="26" height="34" rx="7" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.9" />
          <rect x="5" y="8" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.55" />
          <rect x="5" y="15" width="16" height="4" rx="2" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.45" />
          <path d="M7 27 l5 5 l9 -11" fill="none" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>

        <g className="as-bob2" transform="translate(586, 196)">
          <rect width="24" height="24" rx="6" fill="var(--scene-ink, var(--hero-text))" fillOpacity="0.9" />
          <path d="M24 14 a 8 8 0 0 1 0 12" fill="none" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="4.5" strokeLinecap="round" strokeOpacity="0.85" />
          <path d="M9 6 c-3 -7 3 -11 0 -18" fill="none" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="2.5" strokeLinecap="round" className="as-steam" />
          <path d="M15 8 c-3 -7 3 -11 0 -18" fill="none" stroke="var(--scene-ink, var(--hero-text))" strokeWidth="2.5" strokeLinecap="round" className="as-steam2" />
        </g>
      </svg>
    </div>
  )
}
