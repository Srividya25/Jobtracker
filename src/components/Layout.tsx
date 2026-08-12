import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme, HERO_THEMES } from '../context/ThemeContext'
import { supabase, cleanupOldEmailEvents, getEmailEventCount } from '../lib/supabase'

export default function Layout() {
  const { user } = useAuth()
  const { theme, toggle, heroTheme, setHeroTheme } = useTheme()
  const location = useLocation()
  const [newEmailCount, setNewEmailCount] = useState(0)
  const [showEmailsTab, setShowEmailsTab] = useState(false)
  const cleanupDone = useRef(false)

  useEffect(() => {
    // Run once per session: clears handled emails older than a year.
    if (cleanupDone.current) return
    cleanupDone.current = true
    cleanupOldEmailEvents().catch(() => {})
  }, [])

  useEffect(() => {
    // Only show the Emails tab for users who actually have email events.
    // If the table is missing or the query fails, keep it hidden (no error).
    let cancelled = false
    ;(async () => {
      try {
        const total = await getEmailEventCount()
        if (cancelled) return
        if (total === 0) {
          setShowEmailsTab(false)
          return
        }
        setShowEmailsTab(true)
        const fresh = await getEmailEventCount('new')
        if (!cancelled) setNewEmailCount(fresh)
      } catch {
        if (!cancelled) setShowEmailsTab(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [location.pathname])

  const navTabClass = ({ isActive }: { isActive: boolean }) =>
    `nav-tab${isActive ? ' nav-tab-active' : ''}`

  return (
    <div>
      <style>{`
        .nav-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: var(--hero-grad);
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          font-size: 15px;
          color: var(--hero-text);
          text-decoration: none;
        }
        .nav-brand-box {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: var(--nav-active);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: var(--hero-text);
        }
        .nav-tab {
          padding: 7px 14px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 8px;
          color: var(--hero-text);
          text-decoration: none;
          border: 1px solid transparent;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .nav-tab:hover {
          background: var(--nav-hover);
          border-color: var(--nav-active);
        }
        .nav-tab-active {
          background: var(--nav-active);
          border-color: var(--nav-active);
          color: var(--hero-text);
          font-weight: 700;
        }
        .nav-spacer { flex: 1; }
        .nav-btn {
          padding: 7px 12px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 8px;
          border: 1px solid var(--nav-active);
          background: var(--nav-hover);
          color: var(--hero-text);
          cursor: pointer;
          font-family: inherit;
        }
        .nav-icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid var(--nav-active);
          background: var(--nav-hover);
          color: var(--hero-text);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-family: inherit;
        }
        .nav-select {
          padding: 5px 8px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 8px;
          border: 1px solid var(--nav-active);
          background: var(--nav-hover);
          color: var(--hero-text);
          cursor: pointer;
          font-family: inherit;
        }
      `}</style>
      <nav className="nav-bar">
        <NavLink to="/" className="nav-brand">
          <span className="nav-brand-box">J</span>
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
        {showEmailsTab && (
          <NavLink to="/emails" className={navTabClass}>
            Emails{newEmailCount > 0 ? ` (${newEmailCount})` : ''}
          </NavLink>
        )}

        <div className="nav-spacer" />

        {theme === 'dark' && (
          <select
            className="nav-select"
            title="Choose a theme"
            aria-label="Choose a theme"
            value={heroTheme}
            onChange={(e) => setHeroTheme(e.target.value as typeof heroTheme)}
          >
            {HERO_THEMES.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        )}

        <button className="nav-icon-btn" onClick={toggle} title="Toggle theme" aria-label="Toggle light or dark mode">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {user?.email && <span style={{ fontSize: 13, color: 'var(--hero-text)', opacity: 0.9, margin: '0 4px' }}>{user.email}</span>}

        <button className="nav-btn" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </nav>
      <Outlet />
    </div>
  )
}
