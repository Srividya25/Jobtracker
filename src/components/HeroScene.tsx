import type { ReactNode } from 'react'

const STAGES = [
  { key: 'apply', label: 'Apply', sub: 'Tailor your resume' },
  { key: 'wait1', label: 'Wait', sub: 'Sit tight' },
  { key: 'assessment', label: 'Assessment', sub: 'Show your skills' },
  { key: 'interview', label: 'Interview', sub: 'Impress them' },
  { key: 'wait2', label: 'Wait', sub: 'Almost there' },
  { key: 'offer', label: 'Offer', sub: 'You did it!' },
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
        .hs-blob { fill: var(--hero-text); fill-opacity: .88; stroke: none; }
        .hs-card-strong { fill: var(--hero-text); fill-opacity: .16; stroke: var(--hero-text); stroke-opacity: .85; }
        .hs-stick { stroke: var(--hero-text); fill: none; stroke-linecap: round; stroke-linejoin: round; }
        .hs-soft { opacity: .45; }
        .hs-shadow { fill: var(--hero-text); fill-opacity: .14; }
        .hs-label-big { fill: var(--hero-text); fill-opacity: .95; font-size: 20px; font-weight: 800; text-anchor: middle; letter-spacing: 1px; font-family: inherit; }
        .hs-caption { fill: var(--hero-text); fill-opacity: .55; font-size: 13px; font-weight: 600; text-anchor: middle; letter-spacing: .5px; font-family: inherit; }
        .hs-letter { opacity: 0; animation: hsLetterIn 0.3s ease-out both; }
        .hs-bar-track { fill: var(--hero-text); fill-opacity: .12; }
        .hs-bar-fill { fill: var(--hero-text); fill-opacity: .85; transform-box: fill-box; transform-origin: 0 50%; animation: hsBar 12s steps(1, end) infinite; }
        .hs-plane { animation: hsPlaneX 12s linear infinite; }
        .hs-plane-rot { animation: hsPlaneRot 12s ease-in-out infinite; }
        .hs-plane-arc { animation: hsPlaneArc 12s ease-in-out infinite; }
        .hs-bubble { fill: var(--hero-text); font-size: 16px; font-weight: 800; text-anchor: middle; font-family: inherit; }
        .hs-paper { fill: var(--hero-text); fill-opacity: .18; stroke: var(--hero-text); stroke-opacity: .85; }
        .hs-type { fill: var(--hero-text); fill-opacity: .35; animation: hsBlink 1.2s ease-in-out infinite; }
        .hs-dot { fill: var(--hero-text); }
        .hs-dot-idle { fill: var(--hero-text); fill-opacity: .2; }

        .hs-stage { opacity: 0; animation: hsStage 12s linear infinite; animation-fill-mode: both; }
        .hs-spark, .hs-tick, .hs-pop { transform-box: fill-box; transform-origin: center; animation: hsPop 1.8s ease-in-out infinite; }
        .hs-idle { transform-box: fill-box; transform-origin: center; animation: hsIdle 3.2s ease-in-out infinite; }
        .hs-pace { animation: hsPace 3s ease-in-out infinite alternate; }
        .hs-swap-a { animation: hsSwapA 0.8s steps(1) infinite; }
        .hs-swap-b { animation: hsSwapB 0.8s steps(1) infinite; }
        .hs-nod { transform-box: fill-box; transform-origin: center; animation: hsNod 2.2s ease-in-out infinite; }
        .hs-jump { animation: hsJump 0.9s ease-in-out infinite; }
        .hs-spin { transform-box: fill-box; transform-origin: center; animation: hsSpin 6s linear infinite; }
        .hs-talk { transform-box: fill-box; transform-origin: center; animation: hsTalk 1.6s ease-in-out infinite; }
        .hs-talk2 { transform-box: fill-box; transform-origin: center; animation: hsTalk 1.6s ease-in-out 0.8s infinite; }
        .hs-wait { fill: var(--hero-text); fill-opacity: .9; animation: hsWait 1.5s ease-in-out infinite; }
        .hs-conf { transform-box: fill-box; transform-origin: center; animation: hsConf 2.4s linear infinite; }
        .hs-flash { transform-box: fill-box; transform-origin: center; animation: hsFlash 2.4s ease-out infinite; }
        .hs-tw { animation: hsTw 2.4s ease-in-out infinite; }
        .hs-cloud { animation: hsCloud 3.6s ease-in-out infinite alternate; }
        .hs-rise { animation: hsRise 2.4s ease-in-out infinite alternate; }
        .hs-fly { animation: hsFly 9s linear infinite; }
        .hs-dot-fill { fill: var(--hero-text); fill-opacity: .85; animation: hsDotF0 12s steps(1, end) infinite; }
        .hs-dot-f1 { animation-name: hsDotF1; }
        .hs-dot-f2 { animation-name: hsDotF2; }
        .hs-dot-f3 { animation-name: hsDotF3; }
        .hs-dot-f4 { animation-name: hsDotF4; }
        .hs-dot-f5 { animation-name: hsDotF5; }
        .hs-dot-pulse { fill: none; stroke: var(--hero-text); stroke-opacity: .55; stroke-width: 2; transform-box: fill-box; transform-origin: center; animation: hsDotPulse 2s ease-out infinite; }

        @keyframes hsStage {
          0%   { opacity: 0; transform: translateY(16px); }
          2.5% { opacity: 1; transform: translateY(0); }
          14.2% { opacity: 1; transform: translateY(0); }
          16.7% { opacity: 0; transform: translateY(-16px); }
          100% { opacity: 0; transform: translateY(-16px); }
        }
        @keyframes hsIdle { 0%, 100% { transform: translateY(0) scale(1, 1); } 50% { transform: translateY(-4px) scale(1, 1.02); } }
        @keyframes hsLetterIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes hsBar {
          0% { transform: scaleX(0); }
          16.7% { transform: scaleX(0.167); }
          33.4% { transform: scaleX(0.333); }
          50% { transform: scaleX(0.5); }
          66.7% { transform: scaleX(0.667); }
          83.4% { transform: scaleX(0.833); }
          100% { transform: scaleX(1); }
        }
        @keyframes hsPlaneX {
          0% { transform: translateX(-160px); opacity: 0; }
          3% { opacity: 1; }
          94% { opacity: 1; }
          100% { transform: translateX(1380px); opacity: 0; }
        }
        @keyframes hsPlaneArc { 0%, 100% { transform: translateY(46px); } 45% { transform: translateY(-34px); } }
        @keyframes hsPlaneRot { 0%, 100% { transform: rotate(6deg); } 45% { transform: rotate(-6deg); } }
        @keyframes hsPace { 0% { transform: translateX(-16px); } 100% { transform: translateX(16px); } }
        @keyframes hsSwapA { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }
        @keyframes hsSwapB { 0%, 50% { opacity: 0; } 50.01%, 100% { opacity: 1; } }
        @keyframes hsNod { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
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
        @keyframes hsFlash {
          0%, 6%, 100% { transform: scale(.3); opacity: 0; }
          12% { transform: scale(1.3); opacity: .85; }
          20% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes hsDotPulse { 0% { transform: scale(.7); opacity: .9; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes hsDotF0 { 0%, 100% { fill-opacity: .85; } }
        @keyframes hsDotF1 { 0% { fill-opacity: .2; } 16.7% { fill-opacity: .85; } }
        @keyframes hsDotF2 { 0%, 16.7% { fill-opacity: .2; } 33.4% { fill-opacity: .85; } }
        @keyframes hsDotF3 { 0%, 33.4% { fill-opacity: .2; } 50% { fill-opacity: .85; } }
        @keyframes hsDotF4 { 0%, 50% { fill-opacity: .2; } 66.7% { fill-opacity: .85; } }
        @keyframes hsDotF5 { 0%, 66.7% { fill-opacity: .2; } 83.4% { fill-opacity: .85; } }
        @media (prefers-reduced-motion: reduce) {
          .hero-scene { opacity: 1; }
          .hs-idle, .hs-pace, .hs-swap-a, .hs-swap-b, .hs-nod, .hs-jump, .hs-spin, .hs-talk, .hs-talk2, .hs-wait, .hs-conf, .hs-flash, .hs-tw, .hs-cloud, .hs-rise, .hs-fly, .hs-spark, .hs-tick, .hs-pop, .hs-type, .hs-dot-pulse, .hs-dot-fill, .hs-letter, .hs-bar-fill, .hs-plane, .hs-plane-rot, .hs-plane-arc { animation: none !important; }
          .hs-swap-a { opacity: 1; }
          .hs-swap-b { opacity: 0; }
          .hs-conf, .hs-flash { opacity: 0; }
          .hs-dot-fill { fill-opacity: .85; }
          .hs-letter { opacity: 1; }
          .hs-plane, .hs-plane-rot, .hs-plane-arc { opacity: 0; }
          @keyframes hsStage {
            0% { opacity: 0; }
            2.5% { opacity: 1; }
            14.2% { opacity: 1; }
            16.7% { opacity: 0; }
            100% { opacity: 0; }
          }
        }
      `}</style>
      <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="hsConfGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--primary, var(--hero-text))" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--primary, var(--hero-text))" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="hs-plane">
          <g className="hs-plane-rot">
            <g className="hs-plane-arc">
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
        </g>
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
          <circle
            key={i}
            cx={340 + i * 104}
            cy={376}
            r={5}
            className={`hs-dot-idle hs-dot-fill${i === 0 ? '' : ` hs-dot-f${i}`}`}
          />
        ))}
        <rect x={340} y={390} width={520} height={3} rx={1.5} className="hs-bar-track" />
        <rect x={340} y={390} width={520} height={3} rx={1.5} className="hs-bar-fill" />

        {STAGES.map((st, i) => (
          <g key={st.key} className="hs-stage" style={{ animationDelay: `${i * 2}s` }}>
            <text className="hs-label-big" x={600} y={80}>
              {st.label.split('').map((ch, j) => (
                <tspan key={j} className="hs-letter" style={{ animationDelay: `${i * 2 + j * 0.09}s` }}>
                  {ch}
                </tspan>
              ))}
            </text>
            <text className="hs-caption" x={600} y={104}>
              {st.sub}
            </text>
            {st.key === 'offer' && (
              <g>
                <g transform="translate(510 150)">
                  <g className="hs-rise">
                    <circle cy={0} r={9} className="hs-blob" />
                    <rect x={-9} y={9} width={18} height={22} rx={9} className="hs-blob" />
                    <path d="M0 31 v20" fill="none" stroke="var(--hero-text)" strokeWidth={5} strokeLinecap="round" strokeOpacity="0.4" />
                  </g>
                </g>
                <g transform="translate(700 138)">
                  <g className="hs-rise" style={{ animationDelay: '0.8s' }}>
                    <circle cy={0} r={9} className="hs-blob" />
                    <rect x={-9} y={9} width={18} height={22} rx={9} className="hs-blob" />
                    <path d="M0 31 v20" fill="none" stroke="var(--hero-text)" strokeWidth={5} strokeLinecap="round" strokeOpacity="0.4" />
                  </g>
                </g>
              </g>
            )}
            <g transform="translate(600 84) scale(0.78)">
              <StageBody stage={st.key} />
            </g>
            <ellipse cx={600} cy={392} rx={42} ry={4} className="hs-shadow" />
            <circle cx={340 + i * 104} cy={376} r={5} className="hs-dot-pulse" />
          </g>
        ))}
      </svg>
    </div>
  )
}

function Stem({
  from,
  to,
  w = 6,
}: {
  from: [number, number]
  to: [number, number]
  w?: number
}) {
  return (
    <path
      d={`M${from[0]} ${from[1]} L${to[0]} ${to[1]}`}
      fill="none"
      stroke="var(--hero-text)"
      strokeWidth={w}
      strokeLinecap="round"
      strokeOpacity="0.88"
    />
  )
}

function Leaf({ x, y, ang, r = 8 }: { x: number; y: number; ang: number; r?: number }) {
  return <ellipse cx={x} cy={y} rx={r} ry={r * 0.45} transform={`rotate(${ang} ${x} ${y})`} className="hs-blob" />
}

function Soil() {
  return <ellipse cx={0} cy={-27} rx={11} ry={4.5} fill="var(--hero-text)" fillOpacity="0.3" />
}

function Potted({ x = 0, s = 1, children }: { x?: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} 300) scale(${s})`}>
      <path d="M-16 -30 L16 -30 L11 0 L-11 0 Z" className="hs-blob" />
      <rect x={-18} y={-36} width={36} height={7} rx={3.5} className="hs-blob" />
      {children}
    </g>
  )
}

function Bloom({ scale = 1 }: { scale?: number }) {
  return (
    <g transform={`scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={0} cy={-8.5} rx={5.5} ry={8} transform={`rotate(${a})`} className="hs-blob" />
      ))}
      <circle cy={0} r={5} className="hs-blob" />
    </g>
  )
}

function StageBody({ stage }: { stage: (typeof STAGES)[number]['key'] }) {
  switch (stage) {
    case 'apply':
      return (
        <g>
          <g className="hs-idle">
            <Potted>
              <Soil />
              <circle cx={-3} cy={-26} r={2.2} className="hs-blob" />
              <circle cx={4} cy={-25} r={2} className="hs-blob" />
              <circle cx={6} cy={-42} r={3} className="hs-spark" style={{ animationDelay: '0.4s' }} />
            </Potted>
            <g className="hs-swap-a">
              <g transform="rotate(-38 -30 -46)">
                <rect x={-42} y={-56} width={17} height={21} rx={3} className="hs-blob" />
                <path d="M-42 -50 C-51 -56 -53 -45 -44 -42" fill="none" stroke="var(--hero-text)" strokeWidth={3} strokeLinecap="round" strokeOpacity="0.7" />
                <path d="M-25 -51 L-12 -46 L-14 -39 L-27 -44 Z" className="hs-blob" />
              </g>
              <circle cx={-9} cy={-33} r={2.1} className="hs-wait" />
              <circle cx={-5} cy={-26} r={2.1} className="hs-wait" style={{ animationDelay: '0.22s' }} />
              <circle cx={-1} cy={-19} r={2.1} className="hs-wait" style={{ animationDelay: '0.44s' }} />
            </g>
            <g className="hs-swap-b">
              <rect x={-42} y={-56} width={17} height={21} rx={3} className="hs-blob" />
              <path d="M-42 -50 C-51 -56 -53 -45 -44 -42" fill="none" stroke="var(--hero-text)" strokeWidth={3} strokeLinecap="round" strokeOpacity="0.7" />
              <path d="M-25 -51 L-12 -46 L-14 -39 L-27 -44 Z" className="hs-blob" />
            </g>
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
            <Potted>
              <Soil />
              <Stem from={[0, -30]} to={[0, -62]} w={5} />
              <Leaf x={-2} y={-58} ang={-20} r={6} />
              <Leaf x={2} y={-58} ang={20} r={6} />
              <circle cx={4} cy={-70} r={2.4} className="hs-wait" />
            </Potted>
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
            <Potted>
              <Soil />
              <Stem from={[0, -30]} to={[0, -128]} w={6} />
              <Leaf x={-7} y={-100} ang={-24} r={9} />
              <Leaf x={7} y={-108} ang={24} r={9} />
              <Leaf x={-6} y={-120} ang={-18} r={7} />
              <Leaf x={6} y={-126} ang={18} r={7} />
              <circle cx={0} cy={-138} r={4} className="hs-blob" />
            </Potted>
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
            <Potted x={-44}>
              <Soil />
              <Stem from={[0, -30]} to={[0, -175]} w={5} />
              <Leaf x={-7} y={-96} ang={-24} r={9} />
              <Leaf x={7} y={-104} ang={24} r={9} />
              <Leaf x={-6} y={-140} ang={-18} r={7} />
              <Leaf x={6} y={-146} ang={18} r={7} />
              <Leaf x={-5} y={-164} ang={-14} r={6} />
              <Leaf x={5} y={-170} ang={14} r={6} />
            </Potted>
          </g>
          <g className="hs-idle" style={{ animationDelay: '0.4s' }}>
            <Potted x={44}>
              <Soil />
              <Stem from={[0, -30]} to={[0, -175]} w={5} />
              <Leaf x={-7} y={-96} ang={-24} r={9} />
              <Leaf x={7} y={-104} ang={24} r={9} />
              <Leaf x={-6} y={-140} ang={-18} r={7} />
              <Leaf x={6} y={-146} ang={18} r={7} />
              <Leaf x={-5} y={-164} ang={-14} r={6} />
              <Leaf x={5} y={-170} ang={14} r={6} />
            </Potted>
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
            <Potted>
              <Soil />
              <Stem from={[0, -30]} to={[0, -170]} w={6} />
              <Leaf x={-8} y={-90} ang={-24} r={10} />
              <Leaf x={8} y={-98} ang={24} r={10} />
              <Leaf x={-7} y={-130} ang={-22} r={9} />
              <Leaf x={7} y={-138} ang={22} r={9} />
              <Leaf x={-5} y={-158} ang={-16} r={7} />
              <Leaf x={5} y={-164} ang={16} r={7} />
              <circle cx={0} cy={-178} r={5} className="hs-blob" />
            </Potted>
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
            <Potted>
              <Soil />
              <Stem from={[0, -30]} to={[0, -180]} w={6} />
              <Leaf x={-8} y={-95} ang={-24} r={10} />
              <Leaf x={8} y={-103} ang={24} r={10} />
              <Leaf x={-7} y={-140} ang={-22} r={9} />
              <Leaf x={7} y={-148} ang={22} r={9} />
              <path d="M2 -170 Q20 -182 26 -196" fill="none" stroke="var(--hero-text)" strokeWidth={3} strokeLinecap="round" strokeOpacity="0.6" />
              <Leaf x={26} y={-194} ang={35} r={4} />
              <g transform="translate(0 -186)">
                <Bloom />
              </g>
            </Potted>
            <g transform="translate(28 96)">
              <rect width={22} height={30} rx={3} className="hs-paper" strokeWidth={2.5} />
              <path d="M4 17 l5 6 l10 -12" fill="none" className="hs-stick hs-pop" strokeWidth={3.5} />
            </g>
          </g>
          <ellipse cx={0} cy={80} rx={85} ry={85} fill="url(#hsConfGlow)" className="hs-flash" />
          <rect x={-52} y={64} width={7} height={7} rx={1.5} fill="#f59e0b" className="hs-conf" style={{ animationDelay: '0s' }} />
          <rect x={-40} y={52} width={6} height={6} rx={1.5} fill="#ef4444" className="hs-conf" style={{ animationDelay: '0.18s' }} />
          <rect x={-28} y={60} width={8} height={8} rx={2} fill="#22c55e" className="hs-conf" style={{ animationDelay: '0.36s' }} />
          <rect x={-56} y={52} width={6} height={6} rx={1.5} fill="#3b82f6" className="hs-conf" style={{ animationDelay: '0.12s' }} />
          <rect x={-16} y={48} width={7} height={7} rx={1.5} fill="#ec4899" className="hs-conf" style={{ animationDelay: '0.54s' }} />
          <rect x={-48} y={40} width={6} height={6} rx={1.5} fill="#a855f7" className="hs-conf" style={{ animationDelay: '0.3s' }} />
          <rect x={-32} y={44} width={7} height={7} rx={1.5} fill="var(--hero-text)" className="hs-conf" style={{ animationDelay: '0.66s' }} />
          <rect x={-20} y={58} width={6} height={6} rx={1.5} fill="#f59e0b" className="hs-conf" style={{ animationDelay: '0.8s' }} />
          <rect x={-10} y={66} width={7} height={7} rx={1.5} fill="#22c55e" className="hs-conf" style={{ animationDelay: '0.96s' }} />
        </g>
      )
  }
}
