import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLottieSequence from '../components/AuthLottieSequence'
import BuildBadge from '../components/BuildBadge'
import './auth.css'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    const { error: err } = await signUp(email, password)
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-sub">Start tracking your job search</p>
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
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" autoComplete="email" autoFocus />
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
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="At least 6 characters" autoComplete="new-password" />
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
              <div className="auth-field">
                <label>Confirm Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-field-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                  </span>
                  <input type={showPw ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Re-enter your password" autoComplete="new-password" />
                </div>
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Creating account…' : 'Sign Up'}
              </button>
            </form>
            <p className="auth-foot">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
        <div className="auth-visual">
          <div className="auth-visual-head">
            <h2>Every application, one place.</h2>
            <p>Capture, track, and win your job search.</p>
          </div>
          <AuthLottieSequence />
        </div>
      </div>
      <BuildBadge />
    </div>
  )
}
