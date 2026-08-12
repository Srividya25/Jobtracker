import { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import work from '../assets/lottie/work.json?url'
import assessment from '../assets/lottie/assessment.json?url'
import interview from '../assets/lottie/interview.json?url'
import waiting from '../assets/lottie/waiting.json?url'

const STEPS = [
  { path: work, label: 'Applying' },
  { path: assessment, label: 'Assessment' },
  { path: interview, label: 'Interview' },
  { path: waiting, label: 'Awaiting response' },
] as const

export default function AuthLottieSequence() {
  const [step, setStep] = useState(0)
  const [prevStep, setPrevStep] = useState<number | null>(null)
  const [data, setData] = useState<unknown>(null)
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
  )
  const cache = useRef<Record<number, unknown>>({})

  useEffect(() => {
    let active = true
    const cached = cache.current[step]
    if (cached) {
      setData(cached)
      return
    }
    setData(null)
    fetch(STEPS[step].path)
      .then((r) => r.json())
      .then((json) => {
        if (!active) return
        cache.current[step] = json
        setData(json)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [step])

  const handleComplete = () => {
    if (reduced || !cache.current[step]) return
    setPrevStep(step)
    setStep((s) => (s + 1) % STEPS.length)
  }

  return (
    <div className="al-root" aria-hidden="true">
      <style>{`
        .al-root {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 88px 0 0;
          pointer-events: none;
        }
        .al-stage {
          position: relative;
          width: 100%;
          max-width: 420px;
          height: 340px;
        }
        .al-layer {
          position: absolute;
          inset: 0;
        }
        .al-layer svg {
          width: 100%;
          height: 100%;
        }
        .al-layer.is-in {
          animation: alIn 0.6s ease both;
        }
        .al-layer.is-out {
          animation: alOut 0.55s ease both;
        }
        .al-caption {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 40px;
          margin-top: 10px;
          padding: 7px 18px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--hero-text) 8%, transparent);
          border: 1px solid color-mix(in srgb, var(--hero-text) 18%, transparent);
          box-shadow: 0 6px 18px color-mix(in srgb, var(--hero-text) 10%, transparent);
          animation: alIn 0.6s ease 0.12s both;
        }
        .al-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 55%, var(--hero-text)));
          flex: none;
        }
        .al-label {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: color-mix(in srgb, var(--hero-text) 88%, transparent);
          font-family: inherit;
        }
        [data-theme='dark'] .al-caption {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
        }
        [data-theme='dark'] .al-label {
          color: rgba(255, 255, 255, 0.92);
        }
        @keyframes alIn {
          from { opacity: 0; transform: translateY(10px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes alOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-10px) scale(0.985); }
        }
        @media (max-width: 900px) {
          .al-root { padding: 40px 0 0; }
          .al-stage { height: 300px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .al-layer.is-in, .al-layer.is-out, .al-caption { animation: none; }
        }
      `}</style>
      <div className="al-stage">
        {prevStep !== null && (
          <div
            className="al-layer is-out"
            key={`out-${prevStep}`}
            onAnimationEnd={() => setPrevStep(null)}
          >
            <Lottie animationData={cache.current[prevStep]} loop={false} autoplay={false} rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }} />
          </div>
        )}
        <div className="al-layer is-in" key={`in-${step}`}>
          <Lottie
            animationData={data}
            loop={false}
            autoplay={!reduced && data !== null}
            onComplete={handleComplete}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
          />
        </div>
      </div>
      <div className="al-caption" key={`cap-${step}`}>
        <span className="al-dot" />
        <span className="al-label">{STEPS[step].label}</span>
      </div>
    </div>
  )
}
