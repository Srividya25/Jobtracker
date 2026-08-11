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
        .hs-shadow { fill: var(--hero-text); fill-opacity: .14; }
        .hs-label-big { fill: var(--hero-text); fill-opacity: .95; font-size: 24px; font-weight: 800; text-anchor: middle; letter-spacing: 1px; font-family: inherit; }
        .hs-bubble { fill: var(--hero-text); font-size: 18px; font-weight: 800; text-anchor: middle; font-family: inherit; }
        .hs-paper { fill: var(--hero-text); fill-opacity: .18; stroke: var(--hero-text); stroke-opacity: .85; }
        .hs-type { fill: var(--hero-text); fill-opacity: .35; animation: hsBlink 1.2s ease-in-out infinite; }
        .hs-dot { fill: var(--hero-text); }
        .hs-dot-idle { fill: var(--hero-text); fill-opacity: .2; }

        .hs-stage { animation: hsStage 12s linear infinite; }
        .hs-spark, .hs-tick, .hs-pop { transform-box: fill-box; transform-origin: center; animation: hsPop 1.8s ease-in-out infinite; }
        .hs-idle { animation: hsIdle 3.2s ease-in-out infinite; }
        .hs-spin { transform-box: fill-box; transform-origin: center; animation: hsSpin 6s linear infinite; }
        .hs-talk { transform-box: fill-box; transform-origin: center; animation: hsTalk 1.6s ease-in-out infinite; }
        .hs-wait { fill: var(--hero-text); fill-opacity: .9; animation: hsWait 1.5s ease-in-out infinite; }
        .hs-jump { animation: hsJump .9s ease-in-out infinite; }
        .hs-conf { fill: var(--hero-text); fill-opacity: .55; transform-box: fill-box; transform-origin: center; animation: hsConf 2.4s linear infinite; }

        @keyframes hsStage {
          0%   { opacity: 0; }
          2.5% { opacity: 1; }
          14.2% { opacity: 1; }
          16.7% { opacity: 0; }
          100% { opacity: 0; }
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
        <line x1={330} y1={364} x2={870} y2={364} className="hs-stick hs-soft" strokeWidth={3} />
        {STAGES.map((_, i) => (
          <circle key={i} cx={330 + i * 108} cy={364} r={5} className="hs-dot-idle" />
        ))}
        {STAGES.map((st, i) => (
          <g key={st.key} className="hs-stage" style={{ animationDelay: `${i * 2}s` }}>
            <text className="hs-label-big" x={600} y={62}>
              {st.label}
            </text>
            <g transform="translate(600 8) scale(1.15)">
              <StageBody stage={st.key} />
            </g>
            <ellipse cx={600} cy={392} rx={46} ry={4} className="hs-shadow" />
            <circle cx={330 + i * 108} cy={364} r={5} className="hs-dot" />
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
            <g className="hs-stick" strokeWidth={5}>
              <circle cx={-4} cy={108} r={13} />
              <path d="M-4 121 L0 178" />
              <path d="M0 132 L-14 156 L-26 180" />
              <path d="M0 132 L14 174 L24 230" />
              <path d="M0 178 L-8 232 L-13 300" />
              <path d="M0 178 L8 232 L13 300" />
            </g>
            <circle cx={24} cy={230} r={3.5} className="hs-spark" style={{ animationDelay: '0.6s' }} />
          </g>
          <path d="M-70 252 L70 252 M-58 252 L-58 300 M58 252 L58 300" className="hs-stick hs-soft" strokeWidth={4} />
          <g>
            <rect x={16} y={200} width={44} height={26} rx={3} className="hs-ink" />
            <rect x={24} y={208} width={28} height={3} rx={1.5} className="hs-type" style={{ animationDelay: '0s' }} />
            <rect x={24} y={216} width={22} height={3} rx={1.5} className="hs-type" style={{ animationDelay: '0.2s' }} />
            <rect x={24} y={224} width={14} height={3} rx={1.5} className="hs-type" style={{ animationDelay: '0.4s' }} />
            <rect x={12} y={226} width={52} height={9} rx={3} className="hs-ink" />
          </g>
        </g>
      )

    case 'wait1':
      return (
        <g className="hs-idle">
          <g className="hs-stick" strokeWidth={5}>
            <circle cx={0} cy={108} r={13} />
            <path d="M0 121 L0 178" />
            <path d="M0 132 L-14 156 L-26 180" />
            <path d="M0 132 L14 156 L26 180" />
            <path d="M0 178 L-8 232 L-13 300" />
            <path d="M0 178 L8 232 L13 300" />
          </g>
          <g transform="translate(42 64)">
            <circle r={16} className="hs-stick" strokeWidth={4.5} />
            <g className="hs-spin hs-stick" strokeWidth={3.5}>
              <path d="M0 -12 L0 12" />
              <circle r={2.5} className="hs-ink" />
            </g>
          </g>
        </g>
      )

    case 'assessment':
      return (
        <g className="hs-idle">
          <g className="hs-stick" strokeWidth={5}>
            <circle cx={-4} cy={108} r={13} />
            <path d="M-4 121 L0 178" />
            <path d="M0 132 L-12 154 L16 172" />
            <path d="M0 132 L14 160 L28 190" />
            <path d="M0 178 L-8 232 L-13 300" />
            <path d="M0 178 L8 232 L13 300" />
          </g>
          <g transform="translate(16 172)">
            <rect width={30} height={44} rx={4} className="hs-card-strong" strokeWidth={2.5} />
            <path d="M6 12 l6 7 l12 -15" fill="none" className="hs-stick hs-tick" strokeWidth={3.5} style={{ animationDelay: '0s' }} />
            <path d="M6 26 l6 7 l12 -15" fill="none" className="hs-stick hs-tick" strokeWidth={3.5} style={{ animationDelay: '0.8s' }} />
          </g>
          <path d="M32 212 L42 222" className="hs-stick" strokeWidth={4} />
        </g>
      )

    case 'interview':
      return (
        <g>
          <g className="hs-idle">
            <g className="hs-stick" strokeWidth={5}>
              <circle cx={-42} cy={108} r={13} />
              <path d="M-42 121 L-42 178" />
              <path d="M-42 132 L-52 156 L-64 178" />
              <path d="M-42 132 L-34 184 L-22 238" />
              <path d="M-42 178 L-50 232 L-55 300" />
              <path d="M-42 178 L-34 232 L-29 300" />
            </g>
          </g>
          <g className="hs-idle" style={{ animationDelay: '0.4s' }}>
            <g className="hs-stick" strokeWidth={5}>
              <circle cx={46} cy={108} r={13} />
              <path d="M46 121 L46 190" />
              <path d="M46 132 L36 182 L24 238" />
              <path d="M46 132 L56 156 L68 182" />
              <path d="M46 190 L60 248 L60 300" />
              <path d="M46 190 L38 300" />
            </g>
          </g>
          <path d="M-32 252 L32 252 M-26 252 L-26 300 M26 252 L26 300" className="hs-stick hs-soft" strokeWidth={4} />
          <g className="hs-talk">
            <circle cx={68} cy={74} r={14} className="hs-stick" strokeWidth={4} />
            <path d="M62 86 L54 100 L70 88 Z" fill="none" className="hs-stick hs-soft" strokeWidth={3.5} />
            <text x={68} y={80} textAnchor="middle" className="hs-bubble">
              ?
            </text>
          </g>
        </g>
      )

    case 'wait2':
      return (
        <g className="hs-idle">
          <g className="hs-stick" strokeWidth={5}>
            <circle cx={0} cy={108} r={13} />
            <path d="M0 121 L0 192" />
            <path d="M0 132 L-14 156 L-26 180" />
            <path d="M0 132 L14 156 L26 180" />
            <path d="M0 192 L18 248 L18 300" />
            <path d="M0 192 L6 240 L10 300" />
          </g>
          <g transform="translate(34 66)">
            <circle r={16} className="hs-stick" strokeWidth={4} />
            <circle cx={24} cy={-14} r={7} className="hs-stick" strokeWidth={3.5} />
            <circle cx={38} cy={-28} r={4} className="hs-stick" strokeWidth={3} />
            <circle cx={-5} cy={2} r={2.6} className="hs-wait" style={{ animationDelay: '0s' }} />
            <circle cx={3} cy={2} r={2.6} className="hs-wait" style={{ animationDelay: '0.22s' }} />
            <circle cx={11} cy={2} r={2.6} className="hs-wait" style={{ animationDelay: '0.44s' }} />
          </g>
        </g>
      )

    case 'offer':
      return (
        <g>
          <g className="hs-jump">
            <g className="hs-stick" strokeWidth={5}>
              <circle cx={0} cy={108} r={13} />
              <path d="M0 121 L0 176" />
              <path d="M0 132 L-12 118 L-26 104" />
              <path d="M0 132 L12 118 L26 104" />
              <path d="M0 176 L-12 268" />
              <path d="M0 176 L14 270" />
            </g>
            <g transform="translate(28 96)">
              <rect width={22} height={30} rx={3} className="hs-paper" strokeWidth={2.5} />
              <path d="M4 17 l5 6 l10 -12" fill="none" className="hs-stick hs-pop" strokeWidth={3.5} />
            </g>
          </g>
          <rect x={-46} y={74} width={7} height={7} rx={1.5} className="hs-conf" style={{ animationDelay: '0s' }} />
          <rect x={-34} y={56} width={6} height={6} rx={1.5} className="hs-conf" style={{ animationDelay: '0.35s' }} />
          <rect x={-22} y={68} width={8} height={8} rx={2} className="hs-conf" style={{ animationDelay: '0.7s' }} />
          <rect x={-52} y={62} width={6} height={6} rx={1.5} className="hs-conf" style={{ animationDelay: '0.5s' }} />
          <rect x={-12} y={52} width={7} height={7} rx={1.5} className="hs-conf" style={{ animationDelay: '0.9s' }} />
        </g>
      )
  }
}
