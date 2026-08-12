import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, type Application } from '../lib/supabase'
import { KanbanSkeleton } from '../components/Skeleton'
import './kanban.css'

const COLUMNS = [
  { key: 'applied', color: '#2563eb' },
  { key: 'screening', color: '#7c3aed' },
  { key: 'interview', color: '#d97706' },
  { key: 'offer', color: '#16a34a' },
  { key: 'accepted', color: '#0d9488' },
  { key: 'rejected', color: '#dc2626' },
  { key: 'withdrawn', color: '#6b7280' },
]

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  return `${days}d ago`
}

function toLocalInput(iso: string | null | undefined) {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

type MoveExtra = {
  screening_date?: string | null
  interview_date?: string | null
  interview_location?: string | null
}

export default function Kanban() {
  const [applications, setApplications] = useState<Application[]>([])
  const [dragId, setDragId] = useState<string | null>(null)
  const [overCol, setOverCol] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [pendingMove, setPendingMove] = useState<{ app: Application; status: string } | null>(null)
  const [draftDate, setDraftDate] = useState('')
  const [draftLocation, setDraftLocation] = useState('')
  const navigate = useNavigate()

  const q = search.trim().toLowerCase()
  const filtered = applications.filter(
    (a) => !q || a.company.toLowerCase().includes(q) || a.job_title.toLowerCase().includes(q)
  )

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

  async function moveTo(app: Application, status: string, extra: MoveExtra = {}) {
    if (app.status === status) return
    setSavingId(app.id)
    const { error } = await supabase
      .from('applications')
      .update({ status, ...extra })
      .eq('id', app.id)
    if (error) {
      console.error('Error moving application:', error)
    } else {
      setApplications((prev) => prev.map((a) => (a.id === app.id ? { ...a, status, ...extra } : a)))
    }
    setSavingId(null)
  }

  function onDrop(status: string, e: React.DragEvent) {
    e.preventDefault()
    setOverCol(null)
    const id = e.dataTransfer.getData('text/plain') || dragId
    const app = applications.find((a) => a.id === id)
    setDragId(null)
    if (!app || app.status === status) return
    if (status === 'screening' || status === 'interview') {
      setDraftDate(toLocalInput(status === 'screening' ? app.screening_date : app.interview_date))
      setDraftLocation(status === 'interview' ? app.interview_location || '' : '')
      setPendingMove({ app, status })
      return
    }
    moveTo(app, status)
  }

  function closeModal() {
    setPendingMove(null)
    setDraftDate('')
    setDraftLocation('')
  }

  async function confirmMove() {
    if (!pendingMove) return
    const { app, status } = pendingMove
    closeModal()
    const extra: MoveExtra =
      status === 'screening'
        ? { screening_date: draftDate ? new Date(draftDate).toISOString() : null }
        : { interview_date: draftDate ? new Date(draftDate).toISOString() : null, interview_location: draftLocation.trim() || null }
    await moveTo(app, status, extra)
  }

  if (loading) {
    return <KanbanSkeleton />
  }

  return (
    <div className="kanban">
      <div className="kanban-head">
        <div>
          <h1>Pipeline</h1>
          <p>Drag applications between columns to update their status</p>
        </div>
        <div className="kanban-head-actions">
          <div className="kanban-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              placeholder="Search company or role…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="kanban-btn" onClick={() => navigate('/new')}>
            + New Application
          </button>
        </div>
      </div>

      <div className="kanban-board">
        {COLUMNS.map((col) => {
          const cards = filtered.filter((a) => a.status === col.key)
          return (
            <div
              key={col.key}
              className={`kanban-col ${overCol === col.key ? 'dragover' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setOverCol(col.key) }}
              onDragLeave={() => setOverCol(null)}
              onDrop={(e) => onDrop(col.key, e)}
            >
              <div className="kanban-col-head">
                <span className="kanban-col-dot" style={{ background: col.color }}></span>
                <span className="kanban-col-title">{col.key}</span>
                <span className="kanban-col-count">{cards.length}</span>
              </div>
              {cards.length === 0 && (
                <div className="kanban-empty">{q ? 'No matches' : 'Drop applications here'}</div>
              )}
              {cards.map((app) => (
                <div
                  key={app.id}
                  className={`kanban-card ${dragId === app.id ? 'dragging' : ''}`}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', app.id)
                    setDragId(app.id)
                  }}
                  onDragEnd={() => setDragId(null)}
                >
                  <div className="kanban-card-title">{app.job_title}</div>
                  <div className="kanban-card-company">{app.company}</div>
                  <div className="kanban-card-meta">
                    {app.status === 'screening' && app.screening_date
                      ? '🗓 ' + formatDate(app.screening_date)
                      : app.interview_date
                        ? '🗓 ' + formatDate(app.interview_date)
                        : timeAgo(app.created_at)}
                    {savingId === app.id ? ' · saving…' : ''}
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {pendingMove && (
        <div className="kanban-modal-backdrop" onClick={closeModal}>
          <div className="kanban-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{pendingMove.status === 'screening' ? 'Schedule Screening' : 'Schedule Interview'}</h3>
            <p className="kanban-modal-app">{pendingMove.app.company} — {pendingMove.app.job_title}</p>
            <label className="kanban-modal-label">
              {pendingMove.status === 'screening' ? 'Screening date & time' : 'Interview date & time'}
            </label>
            <input
              type="datetime-local"
              className="kanban-modal-input"
              value={draftDate}
              onChange={(e) => setDraftDate(e.target.value)}
            />
            {pendingMove.status === 'interview' && (
              <>
                <label className="kanban-modal-label">Interview location</label>
                <input
                  type="text"
                  className="kanban-modal-input"
                  value={draftLocation}
                  onChange={(e) => setDraftLocation(e.target.value)}
                  placeholder="e.g. Video call / office address"
                />
              </>
            )}
            <div className="kanban-modal-actions">
              <button className="kanban-btn" onClick={confirmMove} disabled={savingId === pendingMove.app.id}>
                Save & move
              </button>
              <button
                className="dash-btn dash-btn-ghost"
                onClick={() => {
                  const { app, status } = pendingMove
                  closeModal()
                  moveTo(app, status)
                }}
              >
                Move without date
              </button>
              <button className="dash-btn dash-btn-ghost" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
