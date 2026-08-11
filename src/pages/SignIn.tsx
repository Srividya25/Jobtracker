import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthScene from '../components/AuthScene'
import './auth.css'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

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
      <AuthScene />
      <div className="auth-grid">
        <div className="auth-panel">
          <div className="auth-card">
            <div className="auth-logo">J</div>
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-sub">Welcome back to JobTracker</p>
            <div className="auth-notice">
              <strong>This is a demo instance</strong>
              New accounts aren't allowed here. To use JobTracker with your own data, clone the repo, set up your own free Supabase, and run it locally — see the README (github.com/Srividya25/Jobtracker).
            </div>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
              </div>
              <div className="auth-field">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
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
      </div>
    </div>
  )
}
