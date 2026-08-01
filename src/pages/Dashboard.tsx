import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, type Application, exportApplicationsToCSV } from '../lib/supabase'
import './dashboard.css'

const STATUS: Record<string, { label: string; color: string; bg: string }> = {
  applied: { label: 'Applied', color: '#2563eb', bg: '#eff6ff' },
  screening: { label: 'Screening', color: '#7c3aed', bg: '#f5f3ff' },
  interview: { label: 'Interview', color: '#d97706', bg: '#fffbeb' },
  offer: { label: 'Offer', color: '#16a34a', bg: '#f0fdf4' },
  accepted: { label: 'Accepted', color: '#0d9488', bg: '#f0fdfa' },
  rejected: { label: 'Rejected', color: '#dc2626', bg: '#fef2f2' },
  withdrawn: { label: 'Withdrawn', color: '#6b7280', bg: '#f3f4f6' },
}

const AVATAR_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#ef4444']

function avatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] || ''
  const last = parts[1]?.[0] || ''
  return (first + last).toUpperCase()
}

function timeAgo(dateStr: string) {
  const d = new Date(dateStr)
  const diff = Date.now() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days <= 0) {
    const hours = Math.floor(diff / 3600000)
    if (hours <= 1) return 'Just now'
    return `${hours}h ago`
  }
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

// Activity chart: applications per week, last 12 weeks
function useWeeklyActivity(applications: Application[]) {
  return useMemo(() => {
    const weeks: { label: string; count: number }[] = []
    const now = new Date()
    const start = new Date(now)
    start.setDate(start.getDate() - 11 * 7)
    start.setHours(0, 0, 0, 0)
    const weekStart = (d: Date) => {
      const w = new Date(d)
      const day = (w.getDay() + 6) % 7
      w.setDate(w.getDate() - day)
      w.setHours(0, 0, 0, 0)
      return w
    }
    const ws = weekStart(start)
    for (let i = 0; i < 12; i++) {
      const from = new Date(ws)
      from.setDate(from.getDate() + i * 7)
      const to = new Date(from)
      to.setDate(to.getDate() + 7)
      const label = from.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      weeks.push({ label, count: 0 })
      applications.forEach((a) => {
        const d = new Date(a.created_at)
        if (d >= from && d < to) weeks[weeks.length - 1].count++
      })
    }
    const max = Math.max(1, ...weeks.map((w) => w.count))
    return { weeks, max }
  }, [applications])
}

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { weeks, max } = useWeeklyActivity(applications)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .order('created_at', { ascending: false })
        if (cancelled) return
        if (error) console.error('Error fetching applications:', error)
        else setApplications(data || [])
      } catch (err) {
        console.error(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const stats = useMemo(() => {
    const total = applications.length
    const applied = applications.filter((a) => a.status === 'applied' || a.status === 'screening').length
    const interviews = applications.filter((a) => a.status === 'interview').length
    const offers = applications.filter((a) => a.status === 'offer' || a.status === 'accepted').length
    const rejected = applications.filter((a) => a.status === 'rejected').length
    return { total, applied, interviews, offers, rejected }
  }, [applications])

  const upcomingInterviews = useMemo(() => {
    const now = Date.now()
    return applications
      .filter((a) => a.interview_date && new Date(a.interview_date).getTime() >= now - 86400000)
      .sort((a, b) => new Date(a.interview_date!).getTime() - new Date(b.interview_date!).getTime())
      .slice(0, 4)
  }, [applications])

  const filtered = useMemo(() => {
    let list = applications
    if (filter !== 'all') list = list.filter((a) => a.status === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (a) => a.company.toLowerCase().includes(q) || a.job_title.toLowerCase().includes(q)
      )
    }
    return list
  }, [applications, filter, search])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: applications.length }
    applications.forEach((a) => {
      c[a.status] = (c[a.status] || 0) + 1
    })
    return c
  }, [applications])

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    if (!window.confirm('Delete this application?')) return
    setDeletingIds((prev) => new Set(prev).add(id))
    const { error } = await supabase.from('applications').delete().eq('id', id)
    if (error) {
      console.error('Error deleting application:', error)
      setDeletingIds((prev) => { const next = new Set(prev); next.delete(id); return next })
    } else {
      setApplications((prev) => prev.filter((app) => app.id !== id))
      setDeletingIds((prev) => { const next = new Set(prev); next.delete(id); return next })
    }
  }

  const filterOrder = ['all', 'applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn']

  return (
    <div className="dash">
      <header className="dash-hero">
        <div className="dash-hero-inner">
          <div className="dash-hero-top">
            <div>
              <h1>Your Job Search</h1>
              <div className="dash-hero-sub">Track, manage, and land your next role</div>
            </div>
            <div className="dash-hero-actions">
              <button className="dash-btn dash-btn-soft" onClick={() => exportApplicationsToCSV(applications)}>
                ⬇ Export CSV
              </button>
              <button className="dash-btn dash-btn-white" onClick={() => navigate('/new')}>
                + New Application
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-stats">
          <div className="dash-stat">
            <div className="dash-stat-icon" style={{ background: '#eef2ff', color: '#4f46e5' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div>
              <div className="dash-stat-num">{stats.total}</div>
              <div className="dash-stat-label">Total</div>
            </div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <div>
              <div className="dash-stat-num">{stats.applied}</div>
              <div className="dash-stat-label">Applied</div>
            </div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>
            </div>
            <div>
              <div className="dash-stat-num">{stats.interviews}</div>
              <div className="dash-stat-label">Interviews</div>
            </div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17.5 5.5 21l2-7.5L2 9h7z"/></svg>
            </div>
            <div>
              <div className="dash-stat-num">{stats.offers}</div>
              <div className="dash-stat-label">Offers</div>
            </div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-icon" style={{ background: '#fef2f2', color: '#dc2626' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
            </div>
            <div>
              <div className="dash-stat-num">{stats.rejected}</div>
              <div className="dash-stat-label">Rejected</div>
            </div>
          </div>
        </div>

        {upcomingInterviews.length > 0 && (
          <div className="dash-interviews">
            {upcomingInterviews.map((app) => (
              <div
                key={app.id}
                className="dash-interview-card"
                onClick={() => navigate(`/app/${app.id}`)}
              >
                <div className="dash-interview-date">
                  🗓 {new Date(app.interview_date!).toLocaleString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>
                <div className="dash-interview-title">{app.job_title}</div>
                <div className="dash-interview-company">
                  {app.company}
                  {app.interview_location ? ` · ${app.interview_location}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="dash-chart-wrap">
          <div className="dash-chart-head">
            <h3>Activity — applications per week</h3>
            <span>Last 12 weeks</span>
          </div>
          <div className="dash-chart">
            {weeks.map((w, i) => (
              <div key={i} className="dash-chart-bar-wrap">
                <div
                  className="dash-chart-bar"
                  style={{
                    height: `${Math.max(4, (w.count / max) * 100)}px`,
                    background: w.count > 0 ? 'var(--primary)' : 'var(--border)',
                  }}
                  title={`${w.label}: ${w.count}`}
                ></div>
                <div className="dash-chart-label">{w.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-controls">
          <div className="dash-filters">
            {filterOrder.map((key) => (
              <button
                key={key}
                className={`dash-filter ${filter === key ? 'active' : ''}`}
                onClick={() => setFilter(key)}
              >
                {key === 'all' ? 'All' : STATUS[key]?.label || key}
                <span className="count">{counts[key] || 0}</span>
              </button>
            ))}
          </div>
          <div className="dash-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              placeholder="Search company or role…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="dash-table-wrap">
          {loading ? (
            <div className="dash-loading">
              <div className="dash-spinner"></div>
              <div>Loading applications…</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="dash-empty">
              <div className="dash-empty-icon">
                {applications.length === 0 ? '🗂️' : '🔍'}
              </div>
              <h3>{applications.length === 0 ? 'No applications yet' : 'No matches found'}</h3>
              <p>
                {applications.length === 0
                  ? 'Start tracking your job search — add your first application.'
                  : 'Try a different search or filter.'}
              </p>
              {applications.length === 0 && (
                <button className="dash-btn dash-btn-primary" onClick={() => navigate('/new')}>
                  + Add your first application
                </button>
              )}
            </div>
          ) : (
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => {
                  const st = STATUS[app.status] || { label: app.status, color: '#6b7280', bg: '#f3f4f6' }
                  return (
                    <tr key={app.id} onClick={() => navigate(`/app/${app.id}`)}>
                      <td>
                        <div className="dash-company">
                          <div
                            className="dash-company-avatar"
                            style={{ background: avatarColor(app.company) }}
                          >
                            {initials(app.company)}
                          </div>
                          <div className="dash-company-name">{app.company}</div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--text)' }}>{app.job_title}</div>
                        {app.job_url && <div className="dash-company-meta">View posting</div>}
                      </td>
                      <td>
                        <span className="dash-pill" style={{ color: st.color, background: st.bg }}>
                          <span className="dot"></span>
                          {st.label}
                        </span>
                      </td>
                      <td className="dash-date">{timeAgo(app.created_at)}</td>
                      <td>
                        <div className="dash-actions">
                          <button
                            className="dash-icon-btn"
                            title="View"
                            onClick={(e) => { e.stopPropagation(); navigate(`/app/${app.id}`) }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                          <button
                            className="dash-icon-btn"
                            title="Edit"
                            onClick={(e) => { e.stopPropagation(); navigate(`/app/${app.id}/edit`) }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>
                          </button>
                          <button
                            className="dash-icon-btn danger"
                            title="Delete"
                            disabled={deletingIds.has(app.id)}
                            onClick={(e) => handleDelete(app.id, e)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
