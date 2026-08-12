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

export default function Kanban() {
  const [applications, setApplications] = useState<Application[]>([])
  const [dragId, setDragId] = useState<string | null>(null)
  const [overCol, setOverCol] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const navigate = useNavigate()

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

  async function moveTo(app: Application, status: string) {
    if (app.status === status) return
    setSavingId(app.id)
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', app.id)
    if (error) {
      console.error('Error moving application:', error)
    } else {
      setApplications((prev) => prev.map((a) => (a.id === app.id ? { ...a, status } : a)))
    }
    setSavingId(null)
  }

  function onDrop(status: string, e: React.DragEvent) {
    e.preventDefault()
    setOverCol(null)
    const id = e.dataTransfer.getData('text/plain') || dragId
    const app = applications.find((a) => a.id === id)
    if (app) moveTo(app, status)
    setDragId(null)
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
        <button className="kanban-btn" onClick={() => navigate('/new')}>
          + New Application
        </button>
      </div>

      <div className="kanban-board">
        {COLUMNS.map((col) => {
          const cards = applications.filter((a) => a.status === col.key)
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
                <div className="kanban-empty">Drop applications here</div>
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
                    {app.interview_date ? '🗓 ' + new Date(app.interview_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : timeAgo(app.created_at)}
                    {savingId === app.id ? ' · saving…' : ''}
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
