import { createRef, useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import workAnimation from '../assets/animations/work.json'
import assessmentAnimation from '../assets/animations/assessment.json'
import waitingAnimation from '../assets/animations/waiting.json'
import interviewAnimation from '../assets/animations/interview.json'
import offerAnimation from '../assets/animations/offer.json'
import hiredAnimation from '../assets/animations/hired.json'

const STAGES = [
  { step: 'Apply', caption: 'Submit your application', data: workAnimation },
  { step: 'Assessment', caption: 'Show what you know', data: assessmentAnimation },
  { step: 'Waiting', caption: 'Hang tight — good things take time', data: waitingAnimation },
  { step: 'Interview', caption: 'Meet the team', data: interviewAnimation },
  { step: 'Offer', caption: 'The offer lands in your inbox', data: offerAnimation },
  { step: 'Hired', caption: 'Welcome aboard', data: hiredAnimation },
] as const

const FADE_MS = 700

export default function AuthScene() {
  const refs = useRef<ReturnType<typeof createRef<LottieRefCurrentProps>>[]>(
    Array.from({ length: STAGES.length }, () => createRef<LottieRefCurrentProps>())
  )
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const ref = refs.current[active].current
    if (!ref) return
    ref.goToAndStop(0, true)
    if (reduced) return
    const t = window.setTimeout(() => {
      const current = refs.current[active].current
      if (current) current.play()
    }, FADE_MS)
    return () => window.clearTimeout(t)
  }, [active, reduced])

  const next = () => setActive((i) => (i + 1) % STAGES.length)

  return (
    <div className="auth-scene" role="img" aria-label="Your job search journey">
      <div className="auth-scene-stage">
        {STAGES.map((stage, i) => (
          <Lottie
            key={stage.step}
            lottieRef={refs.current[i]}
            animationData={stage.data}
            className={`auth-scene-anim${i === active ? ' is-active' : ''}`}
            loop={false}
            autoplay={false}
            onComplete={next}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="auth-scene-caption">
        <span className="auth-scene-step">{STAGES[active].step}</span>
        <p>{STAGES[active].caption}</p>
      </div>
      <div className="auth-scene-dots" aria-hidden="true">
        {STAGES.map((stage, i) => (
          <span key={stage.step} className={`auth-scene-dot${i === active ? ' is-active' : ''}`} />
        ))}
      </div>
    </div>
  )
}
