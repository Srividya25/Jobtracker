const STAGES = [
  { key: 'apply', label: 'Apply' },
  { key: 'wait1', label: 'Wait' },
  { key: 'assessment', label: 'Assessment' },
  { key: 'interview', label: 'Interview' },
  { key: 'wait2', label: 'Wait' },
  { key: 'offer', label: 'Offer' },
] as const

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
          opacity: 0.85;
        }
        .hero-scene--right { left: auto; width: 100%; }
        .hero-scene svg { width: 100%; height: 100%; display: block; }

        .hs-ink { fill: var(--hero-text); fill-opacity: .9; stroke: none; }
        .hs-card-strong { fill: var(--hero-text); fill-opacity: .16; stroke: var(--hero-text); stroke-opacity: .85; }
        .hs-stick { stroke: var(--hero-text); fill: none; stroke-linecap: round; stroke-linejoin: round; }
        .hs-soft { opacity: .45; }
        .hs-label-big { fill: var(--hero-text); fill-opacity: .95; font-size: 30px; font-weight: 800; text-anchor: middle; letter-spacing: 1px; font-family: inherit; }
        .hs-bubble { fill: var(--hero-text); font-size: 20px; font-weight: 800; text-anchor: middle; font-family: inherit; }
        .hs-paper { fill: var(--hero-text); fill-opacity: .18; stroke: var(--hero-text); stroke-opacity: .85; }
        .hs-type { fill: var(--hero-text); fill-opacity: .35; animation: hsBlink 1.2s ease-in-out infinite; }
        .hs-dot { fill: var(--hero-text); }

        .hs-stage { animation: hsStage 12s linear infinite; }
        .hs-spark, .hs-tick, .hs-pop { transform-box: fill-box; transform-origin: center; animation: hsPop 1.8s ease-in-out infinite; }
        .hs-idle { animation: hsIdle 3.2s ease-in-out infinite; }
        .hs-spin { transform-box: fill-box; transform-origin: center; animation: hsSpin 6s linear infinite; }
        .hs-talk { transform-box: fill-box; transform-origin: center; animation: hsTalk 1.6s ease-in-out infinite; }
        .hs-wait { fill: var(--hero-text); fill-opacity: .9; animation: hsWait 1.5s ease-in-out infinite; }
        .hs-jump { animation: hsJump .9s ease-in-out infinite; }
        .hs-conf { fill: var(--hero-text); fill-opacity: .55; transform-box: fill-box; transform-origin: center; animation: hsConf 2.4s linear infinite; }

        @keyframes hsStage {
          0%   { opacity: 0; transform: translateY(20px); }
          5%   { opacity: 1; transform: translateY(0); }
          16.5% { opacity: 1; transform: translateY(0); }
          21.5% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes hsIdle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes hsSpin { to { transform: rotate(360deg); } }
        @keyframes hsBlink { 0%, 100% { opacity: .18; } 50% { opacity: .75; } }
        @keyframes hsPop { 0%, 55%, 100% { transform: scale(.3); opacity: .2; } 72% { transform: scale(1.18); opacity: 1; } 86% { transform: scale(1); } }
        @keyframes hsTalk { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
        @keyframes hsWait { 0%, 100% { opacity: .12; } 50% { opacity: .95; } }
        @keyframes hsJump { 0%, 100% { transform: translateY(0); } 48% { transform: translateY(-16px); } 56% { transform: translateY(-16px); } }
        @keyframes hsConf { 0% { transform: translateY(0) rotate(0); opacity: 0; } 15% { opacity: .7; } 100% { transform: translateY(110px) rotate(220deg); opacity: 0; } }
      `}</style>
      <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
        <line x1={420} y1={390} x2={780} y2={390} className="hs-stick hs-soft" strokeWidth={3} />

        {STAGES.map((st, i) => (
          <g key={st.key} className="hs-stage" style={{ animationDelay: `${i * 2}s` }}>
            <text className="hs-label-big" x={600} y={66}>
              {st.label}
            </text>
            <g transform="translate(600 10) scale(1.25)">
              <StageBody stage={st.key} />
            </g>
            <circle cx={600 + (i - 2.5) * 34} cy={360} r={6} className="hs-dot" />
          </g>
        ))}
      </svg>
    </div>
  )
}

function StageBody({ stage }: { stage: (typeof STAGES)[number]['key'] }) {
  switch (stage) {
    case 'apply':
      return (
        <g>
          <g className="hs-idle">
            <g className="hs-stick" strokeWidth={6}>
              <circle cx={-6} cy={108} r={12} />
              <path d="M-6 120 L-6 172" />
              <path d="M-6 134 L26 214" />
              <path d="M-6 134 L-28 176" />
              <path d="M-6 172 L-19 300" />
              <path d="M-6 172 L7 300" />
            </g>
            <circle cx={26} cy={214} r={4} className="hs-spark" style={{ animationDelay: '0.6s' }} />
          </g>
          <path d="M-72 252 L72 252 M-60 252 L-60 300 M60 252 L60 300" className="hs-stick hs-soft" strokeWidth={5} />
          <g>
            <rect x={14} y={206} width={44} height={28} rx={3} className="hs-ink" />
            <rect x={22} y={214} width={28} height={3} rx={1.5} className="hs-type" style={{ animationDelay: '0s' }} />
            <rect x={22} y={222} width={22} height={3} rx={1.5} className="hs-type" style={{ animationDelay: '0.2s' }} />
            <rect x={22} y={230} width={14} height={3} rx={1.5} className="hs-type" style={{ animationDelay: '0.4s' }} />
            <rect x={10} y={234} width={52} height={10} rx={3} className="hs-ink" />
          </g>
        </g>
      )

    case 'wait1':
      return (
        <g className="hs-idle">
          <g className="hs-stick" strokeWidth={6}>
            <circle cx={0} cy={108} r={12} />
            <path d="M0 120 L0 186" />
            <path d="M0 134 L-20 198" />
            <path d="M0 134 L4 206" />
            <path d="M0 186 L6 236 L30 300" />
            <path d="M0 186 L-2 236 L20 300" />
          </g>
          <g transform="translate(30 92)">
            <circle r={15} className="hs-stick" strokeWidth={5} />
            <g className="hs-spin hs-stick" strokeWidth={4}>
              <path d="M0 -11 L0 11" />
              <circle r={2.5} className="hs-ink" />
            </g>
          </g>
        </g>
      )

    case 'assessment':
      return (
        <g className="hs-idle">
          <g className="hs-stick" strokeWidth={6}>
            <circle cx={-6} cy={108} r={12} />
            <path d="M-6 120 L-6 172" />
            <path d="M-6 134 L14 178" />
            <path d="M-6 134 L30 206" />
            <path d="M-6 172 L-19 300" />
            <path d="M-6 172 L7 300" />
          </g>
          <g transform="translate(14 176)">
            <rect width={30} height={44} rx={4} className="hs-card-strong" strokeWidth={2.5} />
            <path d="M6 12 l6 7 l12 -15" fill="none" className="hs-stick hs-tick" strokeWidth={4} style={{ animationDelay: '0s' }} />
            <path d="M6 26 l6 7 l12 -15" fill="none" className="hs-stick hs-tick" strokeWidth={4} style={{ animationDelay: '0.8s' }} />
          </g>
          <path d="M32 214 L42 224" className="hs-stick" strokeWidth={5} />
        </g>
      )

    case 'interview':
      return (
        <g>
          <g className="hs-idle">
            <g className="hs-stick" strokeWidth={6}>
              <circle cx={-40} cy={108} r={12} />
              <path d="M-40 120 L-40 172" />
              <path d="M-40 134 L-20 240" />
              <path d="M-40 134 L-60 180" />
              <path d="M-40 172 L-53 300" />
              <path d="M-40 172 L-27 300" />
            </g>
          </g>
          <g className="hs-idle" style={{ animationDelay: '0.4s' }}>
            <g className="hs-stick" strokeWidth={6}>
              <circle cx={44} cy={108} r={12} />
              <path d="M44 120 L44 186" />
              <path d="M44 134 L20 238" />
              <path d="M44 134 L62 202" />
              <path d="M44 186 L58 300" />
              <path d="M44 186 L32 300" />
            </g>
          </g>
          <path d="M-34 254 L34 254 M-28 254 L-28 300 M28 254 L28 300" className="hs-stick hs-soft" strokeWidth={5} />
          <g className="hs-talk">
            <circle cx={66} cy={80} r={14} className="hs-stick" strokeWidth={4.5} />
            <path d="M60 92 L52 108 L68 96 Z" fill="none" className="hs-stick hs-soft" strokeWidth={4} />
            <text x={66} y={86} textAnchor="middle" className="hs-bubble">
              ?
            </text>
          </g>
        </g>
      )

    case 'wait2':
      return (
        <g className="hs-idle">
          <g className="hs-stick" strokeWidth={6}>
            <circle cx={0} cy={108} r={12} />
            <path d="M0 120 L0 186" />
            <path d="M0 134 L-20 198" />
            <path d="M0 134 L4 206" />
            <path d="M0 186 L6 236 L30 300" />
            <path d="M0 186 L-2 236 L20 300" />
          </g>
          <g transform="translate(24 86)">
            <circle r={15} className="hs-stick" strokeWidth={4.5} />
            <circle cx={22} cy={-10} r={7} className="hs-stick" strokeWidth={4} />
            <circle cx={36} cy={-20} r={4} className="hs-stick" strokeWidth={3.5} />
            <circle cx={-4} cy={2} r={2.6} className="hs-wait" style={{ animationDelay: '0s' }} />
            <circle cx={3} cy={2} r={2.6} className="hs-wait" style={{ animationDelay: '0.22s' }} />
            <circle cx={10} cy={2} r={2.6} className="hs-wait" style={{ animationDelay: '0.44s' }} />
          </g>
        </g>
      )

    case 'offer':
      return (
        <g>
          <g className="hs-jump">
            <g className="hs-stick" strokeWidth={6}>
              <circle cx={0} cy={108} r={12} />
              <path d="M0 120 L0 170" />
              <path d="M0 134 L-24 106" />
              <path d="M0 134 L24 106" />
              <path d="M0 170 L-12 268" />
              <path d="M0 170 L14 270" />
            </g>
            <g transform="translate(22 108)">
              <rect width={22} height={30} rx={3} className="hs-paper" strokeWidth={2.5} />
              <path d="M4 17 l5 6 l10 -12" fill="none" className="hs-stick hs-pop" strokeWidth={4} />
            </g>
          </g>
          <rect x={-46} y={70} width={7} height={7} rx={1.5} className="hs-conf" style={{ animationDelay: '0s' }} />
          <rect x={-34} y={52} width={6} height={6} rx={1.5} className="hs-conf" style={{ animationDelay: '0.35s' }} />
          <rect x={-22} y={64} width={8} height={8} rx={2} className="hs-conf" style={{ animationDelay: '0.7s' }} />
          <rect x={-52} y={58} width={6} height={6} rx={1.5} className="hs-conf" style={{ animationDelay: '0.5s' }} />
          <rect x={-12} y={48} width={7} height={7} rx={1.5} className="hs-conf" style={{ animationDelay: '0.9s' }} />
        </g>
      )
  }
}
