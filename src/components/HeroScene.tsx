const STAGES = [
  { key: 'apply', label: 'Apply' },
  { key: 'wait1', label: 'Wait' },
  { key: 'assessment', label: 'Assessment' },
  { key: 'interview', label: 'Interview' },
  { key: 'wait2', label: 'Wait' },
  { key: 'offer', label: 'Offer' },
] as const

function Star({ x, y, d }: { x: number; y: number; d: number }) {
  return (
    <path
      d={`M${x} ${y - 9} L${x + 3} ${y - 3} L${x + 9} ${y} L${x + 3} ${y + 3} L${x} ${y + 9} L${x - 3} ${y + 3} L${x - 9} ${y} L${x - 3} ${y - 3} Z`}
      className="hs-tw"
      style={{ animationDelay: `${d}s` }}
      fill="var(--hero-text)"
      fillOpacity="0.5"
    />
  )
}

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
          opacity: 0.9;
        }
        .hero-scene--right { left: auto; width: 100%; }
        .hero-scene svg { width: 100%; height: 100%; display: block; }

        .hs-ink { fill: var(--hero-text); fill-opacity: .9; stroke: none; }
        .hs-card-strong { fill: var(--hero-text); fill-opacity: .16; stroke: var(--hero-text); stroke-opacity: .85; }
        .hs-stick { stroke: var(--hero-text); fill: none; stroke-linecap: round; stroke-linejoin: round; }
        .hs-soft { opacity: .45; }
        .hs-shadow { fill: var(--hero-text); fill-opacity: .14; }
        .hs-label-big { fill: var(--hero-text); fill-opacity: .95; font-size: 20px; font-weight: 800; text-anchor: middle; letter-spacing: 1px; font-family: inherit; }
        .hs-bubble { fill: var(--hero-text); font-size: 16px; font-weight: 800; text-anchor: middle; font-family: inherit; }
        .hs-paper { fill: var(--hero-text); fill-opacity: .18; stroke: var(--hero-text); stroke-opacity: .85; }
        .hs-type { fill: var(--hero-text); fill-opacity: .35; animation: hsBlink 1.2s ease-in-out infinite; }
        .hs-dot { fill: var(--hero-text); }
        .hs-dot-idle { fill: var(--hero-text); fill-opacity: .2; }

        .hs-stage { opacity: 0; animation: hsStage 12s linear infinite; animation-fill-mode: both; }
        .hs-spark, .hs-tick, .hs-pop { transform-box: fill-box; transform-origin: center; animation: hsPop 1.8s ease-in-out infinite; }
        .hs-idle { animation: hsIdle 3.2s ease-in-out infinite; }
        .hs-pace { animation: hsPace 3s ease-in-out infinite alternate; }
        .hs-spin { transform-box: fill-box; transform-origin: center; animation: hsSpin 6s linear infinite; }
        .hs-talk { transform-box: fill-box; transform-origin: center; animation: hsTalk 1.6s ease-in-out infinite; }
        .hs-talk2 { transform-box: fill-box; transform-origin: center; animation: hsTalk 1.6s ease-in-out 0.8s infinite; }
        .hs-wait { fill: var(--hero-text); fill-opacity: .9; animation: hsWait 1.5s ease-in-out infinite; }
        .hs-jump { animation: hsJump .9s ease-in-out infinite; }
        .hs-conf { fill: var(--hero-text); fill-opacity: .55; transform-box: fill-box; transform-origin: center; animation: hsConf 2.4s linear infinite; }
        .hs-tw { animation: hsTw 2.4s ease-in-out infinite; }
        .hs-cloud { animation: hsCloud 3.6s ease-in-out infinite alternate; }
        .hs-rise { animation: hsRise 2.4s ease-in-out infinite alternate; }
        .hs-fly { animation: hsFly 9s linear infinite; }

        @keyframes hsStage {
          0%   { opacity: 0; }
          2.5% { opacity: 1; }
          14.2% { opacity: 1; }
          16.7% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes hsIdle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes hsPace { 0% { transform: translateX(-16px); } 100% { transform: translateX(16px); } }
        @keyframes hsSpin { to { transform: rotate(360deg); } }
        @keyframes hsBlink { 0%, 100% { opacity: .18; } 50% { opacity: .75; } }
        @keyframes hsPop { 0%, 55%, 100% { transform: scale(.3); opacity: .2; } 72% { transform: scale(1.18); opacity: 1; } 86% { transform: scale(1); } }
        @keyframes hsTalk { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
        @keyframes hsWait { 0%, 100% { opacity: .12; } 50% { opacity: .95; } }
        @keyframes hsJump { 0%, 100% { transform: translateY(0); } 48% { transform: translateY(-16px); } 56% { transform: translateY(-16px); } }
        @keyframes hsConf { 0% { transform: translateY(0) rotate(0); opacity: 0; } 15% { opacity: .7; } 100% { transform: translateY(110px) rotate(220deg); opacity: 0; } }
        @keyframes hsTw { 0%, 100% { opacity: .1; } 50% { opacity: .8; } }
        @keyframes hsCloud { 0% { transform: translateX(0); } 100% { transform: translateX(16px); } }
        @keyframes hsRise { 0% { transform: translateY(0); } 100% { transform: translateY(-70px); } }
        @keyframes hsFly { 0% { transform: translateX(-150px); } 100% { transform: translateX(1370px); } }
      `}</style>
      <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
        {/* background: stars + clouds */}
        <Star x={170} y={150} d={0} />
        <Star x={310} y={70} d={0.35} />
        <Star x={1040} y={80} d={0.7} />
        <Star x={1100} y={210} d={1.05} />
        <Star x={150} y={300} d={1.4} />
        <Star x={960} y={330} d={1.75} />
        <g transform="translate(150 66)">
          <g className="hs-cloud">
            <circle cx={12} cy={22} r={10} fill="var(--hero-text)" fillOpacity="0.16" />
            <circle cx={27} cy={16} r={13} fill="var(--hero-text)" fillOpacity="0.16" />
            <circle cx={42} cy={22} r={10} fill="var(--hero-text)" fillOpacity="0.16" />
            <rect x={12} y={20} width={30} height={12} rx={6} fill="var(--hero-text)" fillOpacity="0.16" />
          </g>
        </g>
        <g transform="translate(1030 56)">
          <g className="hs-cloud" style={{ animationDelay: '0.9s' }}>
            <circle cx={10} cy={18} r={8} fill="var(--hero-text)" fillOpacity="0.13" />
            <circle cx={22} cy={13} r={11} fill="var(--hero-text)" fillOpacity="0.13" />
            <circle cx={34} cy={18} r={8} fill="var(--hero-text)" fillOpacity="0.13" />
            <rect x={10} y={16} width={24} height={10} rx={5} fill="var(--hero-text)" fillOpacity="0.13" />
          </g>
        </g>

        {/* timeline dots */}
        {STAGES.map((_, i) => (
          <circle key={i} cx={340 + i * 104} cy={376} r={5} className="hs-dot-idle" />
        ))}

        {STAGES.map((st, i) => (
          <g key={st.key} className="hs-stage" style={{ animationDelay: `${i * 2}s` }}>
            <text className="hs-label-big" x={600} y={80}>
              {st.label}
            </text>
            {st.key === 'apply' && (
              <g transform="translate(0 170)">
                <g className="hs-fly">
                  <path
                    d="M0 14 L60 2 L38 40 L26 26 L8 28 Z"
                    fill="var(--hero-text)"
                    fillOpacity="0.22"
                    stroke="var(--hero-text)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            )}
            {st.key === 'offer' && (
              <g>
                <g transform="translate(510 150)">
                  <g className="hs-rise">
                    <ellipse cx={0} cy={0} rx={11} ry={14} className="hs-stick" strokeWidth={3.5} />
                    <path d="M0 13 l-4 8 h8 Z" fill="var(--hero-text)" fillOpacity="0.2" stroke="var(--hero-text)" strokeWidth={2.5} strokeLinejoin="round" />
                    <path d="M0 21 v34" className="hs-stick hs-soft" strokeWidth={2.5} />
                  </g>
                </g>
                <g transform="translate(700 138)">
                  <g className="hs-rise" style={{ animationDelay: '0.8s' }}>
                    <ellipse cx={0} cy={0} rx={11} ry={14} className="hs-stick" strokeWidth={3.5} />
                    <path d="M0 13 l-4 8 h8 Z" fill="var(--hero-text)" fillOpacity="0.2" stroke="var(--hero-text)" strokeWidth={2.5} strokeLinejoin="round" />
                    <path d="M0 21 v34" className="hs-stick hs-soft" strokeWidth={2.5} />
                  </g>
                </g>
              </g>
            )}
            <g transform="translate(600 84) scale(0.78)">
              <StageBody stage={st.key} />
            </g>
            <ellipse cx={600} cy={392} rx={42} ry={4} className="hs-shadow" />
            <circle cx={340 + i * 104} cy={376} r={5} className="hs-dot" />
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
        <g className="hs-pace">
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
        </g>
      )

    case 'assessment':
      return (
        <g>
          <g className="hs-idle">
            <g className="hs-stick" strokeWidth={5}>
              <circle cx={0} cy={108} r={13} />
              <path d="M0 121 L0 186" />
              <path d="M0 132 L-14 190 L-18 240" />
              <path d="M0 132 L14 190 L18 240" />
              <path d="M0 186 L16 244 L16 300" />
              <path d="M0 186 L4 240 L8 300" />
            </g>
            <circle cx={-18} cy={240} r={3.5} className="hs-spark" style={{ animationDelay: '0.5s' }} />
            <circle cx={18} cy={240} r={3.5} className="hs-spark" style={{ animationDelay: '1.1s' }} />
          </g>
          <path d="M-70 250 L70 250 M-60 250 L-60 300 M60 250 L60 300" className="hs-stick hs-soft" strokeWidth={4} />
          <g>
            <rect x={-30} y={202} width={60} height={34} rx={3} className="hs-ink" />
            <rect x={-24} y={211} width={22} height={3} rx={1.5} className="hs-type" style={{ animationDelay: '0s' }} />
            <rect x={-24} y={220} width={22} height={3} rx={1.5} className="hs-type" style={{ animationDelay: '0.3s' }} />
            <rect x={-24} y={229} width={22} height={3} rx={1.5} className="hs-type" style={{ animationDelay: '0.6s' }} />
            <path d="M4 210 l5 6 l11 -13" fill="none" className="hs-stick hs-tick" strokeWidth={3.5} style={{ animationDelay: '0.4s' }} />
            <path d="M4 219 l5 6 l11 -13" fill="none" className="hs-stick hs-tick" strokeWidth={3.5} style={{ animationDelay: '1.1s' }} />
            <path d="M4 228 l5 6 l11 -13" fill="none" className="hs-stick hs-tick" strokeWidth={3.5} style={{ animationDelay: '1.6s' }} />
            <rect x={-38} y={236} width={76} height={9} rx={3} className="hs-ink" />
          </g>
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
              <path d="M-51 117 q6 7 12 0" />
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
              <path d="M39 117 q6 7 12 0" />
            </g>
          </g>
          <path d="M-32 252 L32 252 M-26 252 L-26 300 M26 252 L26 300" className="hs-stick hs-soft" strokeWidth={4} />
          <rect x={-20} y={234} width={11} height={10} rx={2.5} fill="var(--hero-text)" fillOpacity="0.2" stroke="var(--hero-text)" strokeWidth="2.5" />
          <path d="M-9 238 a 5 5 0 0 1 0 8" fill="none" className="hs-stick hs-soft" strokeWidth={2.5} />
          <rect x={10} y={240} width={16} height={6} rx={1.5} className="hs-card-strong" strokeWidth={1.5} />
          <g className="hs-talk">
            <circle cx={68} cy={74} r={14} className="hs-stick" strokeWidth={4} />
            <path d="M62 86 L54 100 L70 88 Z" fill="none" className="hs-stick hs-soft" strokeWidth={3.5} />
            <text x={68} y={80} textAnchor="middle" className="hs-bubble">
              ?
            </text>
          </g>
          <g className="hs-talk2">
            <circle cx={-70} cy={78} r={13} className="hs-stick" strokeWidth={4} />
            <path d="M-64 89 L-72 102 L-58 91 Z" fill="none" className="hs-stick hs-soft" strokeWidth={3.5} />
            <text x={-70} y={83} textAnchor="middle" className="hs-bubble">
              …
            </text>
          </g>
        </g>
      )

    case 'wait2':
      return (
        <g className="hs-pace">
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
