import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { supabase } from '../lib/supabase'

export default function Layout() {
  const { user } = useAuth()
  const { theme, toggle } = useTheme()

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '7px 14px',
    fontSize: 13,
    fontWeight: 600,
    borderRadius: 8,
    color: isActive ? '#fff' : 'var(--text-2)',
    background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
    textDecoration: 'none',
    transition: 'background 0.15s ease, color 0.15s ease',
    border: isActive ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
  })

  return (
    <div>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 24px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #a855f7 100%)',
        }}
      >
        <NavLink to="/" style={{ ...linkStyle(false), display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 15 }}>
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: 'rgba(255,255,255,0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              color: '#fff',
            }}
          >
            J
          </span>
          JobTracker
        </NavLink>

        <NavLink to="/" style={({ isActive }) => linkStyle(isActive)}>
          Dashboard
        </NavLink>
        <NavLink to="/kanban" style={({ isActive }) => linkStyle(isActive)}>
          Pipeline
        </NavLink>
        <NavLink to="/resumes" style={({ isActive }) => linkStyle(isActive)}>
          Resumes
        </NavLink>

        <div style={{ flex: 1 }} />

        <button
          onClick={toggle}
          title="Toggle theme"
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.15)',
            color: '#fff',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {user?.email && (
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', margin: '0 4px' }}>{user.email}</span>
        )}

        <button
          onClick={() => supabase.auth.signOut()}
          style={{
            padding: '7px 12px',
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.15)',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </nav>
      <Outlet />
    </div>
  )
}
