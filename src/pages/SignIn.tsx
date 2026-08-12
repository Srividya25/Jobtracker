import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import { useAuth } from '../context/AuthContext'
import BuildBadge from '../components/BuildBadge'
import codingAnimation from '../assets/animations/coding.json'
import './auth.css'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [typing, setTyping] = useState(false)
  const typeTimer = useRef<number>()
  const { signIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => () => window.clearTimeout(typeTimer.current), [])

  const markTyping = () => {
    setTyping(true)
    window.clearTimeout(typeTimer.current)
    typeTimer.current = window.setTimeout(() => setTyping(false), 1000)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(email, password)
    setLoading(false)
    if (err) setError(err.message)
    else navigate('/')
  }

  return (
    <div className="auth">
      <div className="auth-grid">
        <div className="auth-panel">
          <div className="auth-card">
            <div className="auth-logo">J</div>
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-sub">Welcome back to JobTracker</p>
            <div className="auth-notice">
              <strong>This is a demo instance</strong>
              New accounts aren't allowed here. To use JobTracker with your own data, clone the repo, set up your own free Supabase, and run it locally — see the README (<a href="https://github.com/Srividya25/Jobtracker">github.com/Srividya25/Jobtracker</a>).
            </div>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>Email</label>
                <div className="auth-input-wrap">
                  <span className="auth-field-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                  </span>
                  <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); markTyping() }} onKeyDown={markTyping} required placeholder="you@example.com" autoComplete="email" autoFocus />
                </div>
              </div>
              <div className="auth-field">
                <label>Password</label>
                <div className="auth-input-wrap has-toggle">
                  <span className="auth-field-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                  </span>
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); markTyping() }} onKeyDown={markTyping} required placeholder="••••••••" autoComplete="current-password" />
                  <button
                    type="button"
                    className="auth-pw-toggle"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPw ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
            <p className="auth-foot">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
        <div className="auth-visual">
          <div className="auth-visual-head">
            <h2>Every application, one place.</h2>
            <p>Capture, track, and win your job search.</p>
          </div>
          <Lottie
            animationData={codingAnimation}
            className="auth-lottie"
            loop
            autoplay
            aria-hidden="true"
          />
        </div>
      </div>
      <BuildBadge />
    </div>
  )
}
