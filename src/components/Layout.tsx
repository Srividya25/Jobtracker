import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { supabase, cleanupOldEmailEvents, getEmailEventCount } from '../lib/supabase'

export default function Layout() {
  const { user } = useAuth()
  const { theme, toggle } = useTheme()
  const location = useLocation()
  const [newEmailCount, setNewEmailCount] = useState(0)
  const cleanupDone = useRef(false)

  useEffect(() => {
    // Run once per session: clears handled emails older than a year.
    if (cleanupDone.current) return
    cleanupDone.current = true
    cleanupOldEmailEvents().catch(() => {})
  }, [])

  useEffect(() => {
    let cancelled = false
    getEmailEventCount('new')
      .then((c) => {
        if (!cancelled) setNewEmailCount(c)
      })
      .catch(() => {
        if (!cancelled) setNewEmailCount(0)
      })
    return () => {
      cancelled = true
    }
  }, [location.pathname])

  const navTabClass = ({ isActive }: { isActive: boolean }) =>
    `nav-tab${isActive ? ' nav-tab-active' : ''}`

  return (
    <div>
      <style>{`
        .nav-tab {
          padding: 7px 14px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 8px;
          color: rgba(255,255,255,0.95);
          text-decoration: none;
          border: 1px solid transparent;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .nav-tab:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.2);
        }
        .nav-tab-active {
          background: rgba(255,255,255,0.26);
          border-color: rgba(255,255,255,0.4);
          color: #fff;
          font-weight: 700;
        }
      `}</style>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 24px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #a855f7 100%)',
        }}
      >
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 15, color: 'rgba(255,255,255,0.95)', textDecoration: 'none' }}>
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

        <NavLink to="/" className={navTabClass}>
          Dashboard
        </NavLink>
        <NavLink to="/kanban" className={navTabClass}>
          Pipeline
        </NavLink>
        <NavLink to="/resumes" className={navTabClass}>
          Resumes
        </NavLink>
        <NavLink to="/emails" className={navTabClass}>
          Emails{newEmailCount > 0 ? ` (${newEmailCount})` : ''}
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
