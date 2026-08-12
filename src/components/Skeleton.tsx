import type { CSSProperties } from 'react'
import './skeleton.css'

/* Keep skeleton loaders visible for at least this long so fast loads
   still feel smooth and intentional instead of flashing content in. */
export const MIN_LOADING_MS = 800

export function minDelay(startedAt: number): Promise<void> {
  const remaining = MIN_LOADING_MS - (Date.now() - startedAt)
  return remaining > 0
    ? new Promise((resolve) => setTimeout(resolve, remaining))
    : Promise.resolve()
}

export function Skeleton({
  className = '',
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return <div className={`sk ${className}`} style={style} aria-hidden="true" />
}

/* Minimal accent spinner used for the auth boot state */
export function PageLoader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="sk-spinner" />
      <div>{label}</div>
    </div>
  )
}

/* ---- Dashboard: stat cards, chart, filter bar, table ---- */
export function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard">
      <div className="sk-dash-stats">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="sk-dash-stat">
            <Skeleton className="sk-circle" style={{ width: 42, height: 42, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <Skeleton className="sk-bar" style={{ width: '60%', height: 22 }} />
              <Skeleton className="sk-bar" style={{ width: '40%', height: 10, marginTop: 8 }} />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="sk-block" style={{ height: 160, marginBottom: 24 }} />

      <div className="sk-dash-controls">
        <div style={{ display: 'flex', gap: 8 }}>
          <Skeleton className="sk-pill" style={{ width: 80, height: 30 }} />
          <Skeleton className="sk-pill" style={{ width: 90, height: 30 }} />
          <Skeleton className="sk-pill" style={{ width: 96, height: 30 }} />
        </div>
        <Skeleton className="sk-pill" style={{ width: 200, height: 34 }} />
      </div>

      <div className="sk-dash-table">
        <Skeleton className="sk-bar" style={{ width: 90, height: 14, margin: '16px 18px 0' }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="sk-dash-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Skeleton className="sk-circle" style={{ width: 38, height: 38, flexShrink: 0 }} />
              <Skeleton className="sk-bar" style={{ width: 140, height: 12 }} />
            </div>
            <Skeleton className="sk-bar" style={{ width: 160, height: 12 }} />
            <Skeleton className="sk-pill" style={{ width: 90, height: 22 }} />
            <Skeleton className="sk-bar" style={{ width: 56, height: 12 }} />
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
              {[0, 1, 2].map((j) => (
                <Skeleton key={j} className="sk-btn" style={{ width: 32, height: 32 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Pipeline: column headers + placeholder cards ---- */
const KANBAN_COLUMNS = ['applied', 'screening', 'interview', 'offer', 'accepted', 'rejected', 'withdrawn']

export function KanbanSkeleton() {
  return (
    <div className="kanban">
      <div className="kanban-head">
        <div>
          <Skeleton className="sk-bar" style={{ width: 140, height: 20 }} />
          <Skeleton className="sk-bar" style={{ width: 240, height: 12, marginTop: 8 }} />
        </div>
        <Skeleton className="sk-btn" style={{ width: 140, height: 34 }} />
      </div>
      <div className="kanban-board" role="status" aria-label="Loading pipeline">
        {KANBAN_COLUMNS.map((col) => (
          <div key={col} className="kanban-col">
            <div className="kanban-col-head">
              <Skeleton className="sk-circle" style={{ width: 8, height: 8, flexShrink: 0 }} />
              <Skeleton className="sk-bar" style={{ width: 66, height: 12 }} />
              <Skeleton className="sk-pill" style={{ width: 26, height: 18 }} />
            </div>
            {[0, 1].map((j) => (
              <div key={j} className="kanban-card">
                <Skeleton className="sk-bar" style={{ width: '85%', height: 12 }} />
                <Skeleton className="sk-bar" style={{ width: '55%', height: 10, marginTop: 8 }} />
                <Skeleton className="sk-bar" style={{ width: '40%', height: 9, marginTop: 10 }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Resumes: list rows ---- */
export function ResumesSkeleton() {
  return (
    <div className="resume-list" role="status" aria-label="Loading resumes">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="resume-row">
          <Skeleton className="sk-circle" style={{ width: 40, height: 40, flexShrink: 0 }} />
          <div className="resume-info">
            <Skeleton className="sk-bar" style={{ width: '45%', height: 12 }} />
            <Skeleton className="sk-bar" style={{ width: '30%', height: 10, marginTop: 6 }} />
          </div>
          <Skeleton className="sk-btn" style={{ width: 60, height: 30 }} />
        </div>
      ))}
    </div>
  )
}

/* ---- Emails: card grid ---- */
export function EmailsSkeleton() {
  return (
    <div className="emails-grid" role="status" aria-label="Loading emails">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="emails-card">
          <div className="emails-card-top">
            <Skeleton className="sk-pill" style={{ width: 74, height: 18 }} />
            <Skeleton className="sk-bar" style={{ width: 60, height: 10 }} />
          </div>
          <Skeleton className="sk-bar" style={{ width: '80%', height: 13, marginTop: 4 }} />
          <Skeleton className="sk-bar" style={{ width: '95%', height: 10 }} />
          <Skeleton className="sk-bar" style={{ width: '65%', height: 10 }} />
          <div className="emails-actions">
            <Skeleton className="sk-btn" style={{ width: 100, height: 30 }} />
            <Skeleton className="sk-btn" style={{ width: 70, height: 30 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---- Application detail: hero band + card body ---- */
export function DetailSkeleton() {
  return (
    <div className="detail" role="status" aria-label="Loading application">
      <div className="detail-inner">
        <div className="detail-top">
          <Skeleton className="sk-btn" style={{ width: 120, height: 30 }} />
          <Skeleton className="sk-btn" style={{ width: 70, height: 30 }} />
        </div>
        <div className="detail-card">
          <div className="sk-detail-hero">
            <Skeleton className="sk-bar sk-on-hero" style={{ width: 220, height: 20 }} />
            <Skeleton className="sk-bar sk-on-hero" style={{ width: 140, height: 13, marginTop: 8 }} />
          </div>
          <div className="detail-body">
            <div className="detail-grid">
              <div>
                <Skeleton className="sk-bar" style={{ width: 60, height: 10 }} />
                <Skeleton className="sk-pill" style={{ width: 90, height: 24, marginTop: 8 }} />
              </div>
              <div>
                <Skeleton className="sk-bar" style={{ width: 60, height: 10 }} />
                <Skeleton className="sk-bar" style={{ width: 120, height: 13, marginTop: 10 }} />
              </div>
            </div>
            <Skeleton className="sk-bar" style={{ width: 140, height: 12, marginTop: 28 }} />
            <Skeleton className="sk-bar" style={{ width: '70%', height: 12, marginTop: 10 }} />
            <Skeleton className="sk-bar" style={{ width: 160, height: 12, marginTop: 28 }} />
            <Skeleton className="sk-bar" style={{ width: '80%', height: 12, marginTop: 10 }} />
            <Skeleton className="sk-bar" style={{ width: '55%', height: 12, marginTop: 10 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
