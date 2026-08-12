import { useCallback, useEffect, useState } from 'react'
import { cleanupOldEmailEvents, getEmailEvents, updateEmailEventStatus, type EmailEvent } from '../lib/supabase'
import { EmailsSkeleton, minDelay } from '../components/Skeleton'
import './emails.css'

type Filter = 'new' | 'done' | 'dismissed'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'done', label: 'Done' },
  { key: 'dismissed', label: 'Dismissed' },
]

const EMPTY_TEXT: Record<Filter, string> = {
  new: 'No detected emails yet. Email detection is off by default — to turn it on, open the JobTracker extension popup and enable “Gmail detection”, then keep Gmail open in Chrome.',
  done: 'Nothing marked as done yet. Mark handled emails as done to keep them here.',
  dismissed: 'No dismissed emails. Dismiss irrelevant ones to tidy this up.',
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function Emails() {
  const [filter, setFilter] = useState<Filter>('new')
  const [emails, setEmails] = useState<EmailEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const load = useCallback(async (status: Filter) => {
    const started = Date.now()
    try {
      await cleanupOldEmailEvents()
    } catch (err) {
      console.debug('email cleanup unavailable:', err)
    }
    try {
      const rows = await getEmailEvents(status)
      setEmails(rows)
    } catch (err) {
      console.debug('email_events unavailable:', err)
      setEmails([])
    } finally {
      await minDelay(started)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    load(filter)
  }, [filter, load])

  async function setStatus(id: string, status: string) {
    setBusyId(id)
    setError('')
    try {
      await updateEmailEventStatus(id, status)
      setEmails((prev) => prev.filter((x) => x.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="emails">
      <div className="emails-inner">
        <div className="emails-head">
          <h1>Emails</h1>
          <p>Interview and assessment emails detected from your Gmail. Mark as done once handled, or dismiss if not relevant.</p>
          <div className="emails-note">ℹ️ Done and dismissed emails are automatically cleared after 1 year, so this list stays tidy.</div>
        </div>

        <div className="emails-tabs">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`emails-tab${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error && <div className="emails-error">⚠ {error}</div>}

        <div className="emails-list">
          {loading ? (
            <EmailsSkeleton />
          ) : emails.length === 0 ? (
            <div className="emails-empty">
              <div className="emails-empty-icon">📭</div>
              <p>{EMPTY_TEXT[filter]}</p>
            </div>
          ) : (
            <div className="emails-grid">
              {emails.map((ev) => (
                <div key={ev.id} className="emails-card">
                  <div className="emails-card-top">
                    <span
                      className={`emails-badge ${ev.detected_type === 'assessment' ? 'assessment' : 'interview'}`}
                    >
                      {ev.detected_type === 'assessment' ? 'Assessment' : 'Interview'}
                    </span>
                    <span className="emails-date">{formatDate(ev.email_date)}</span>
                  </div>
                  <div className="emails-subject">{ev.email_subject}</div>
                  <div className="emails-sender">
                    {ev.email_sender}
                    {ev.email_snippet
                      ? ` — ${ev.email_snippet.length > 90 ? ev.email_snippet.slice(0, 90) + '…' : ev.email_snippet}`
                      : ''}
                  </div>
                  <div className="emails-actions">
                    <button
                      className="emails-btn emails-btn-done"
                      disabled={busyId === ev.id}
                      onClick={() => setStatus(ev.id, 'done')}
                    >
                      ✓ Mark as done
                    </button>
                    <button
                      className="emails-btn emails-btn-dismiss"
                      title="Dismiss"
                      disabled={busyId === ev.id}
                      onClick={() => setStatus(ev.id, 'dismissed')}
                    >
                      ✕ Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
