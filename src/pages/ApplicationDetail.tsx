import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase, getResumeSignedUrl, type Application } from '../lib/supabase'
import AuthLottieSequence from '../components/AuthLottieSequence'
import { DetailSkeleton } from '../components/Skeleton'
import './detail.css'

const STATUS: Record<string, { label: string; color: string; bg: string }> = {
  applied: { label: 'Applied', color: '#2563eb', bg: '#eff6ff' },
  screening: { label: 'Screening', color: '#7c3aed', bg: '#f5f3ff' },
  interview: { label: 'Interview', color: '#d97706', bg: '#fffbeb' },
  offer: { label: 'Offer', color: '#16a34a', bg: '#f0fdf4' },
  accepted: { label: 'Accepted', color: '#0d9488', bg: '#f0fdfa' },
  rejected: { label: 'Rejected', color: '#dc2626', bg: '#fef2f2' },
  withdrawn: { label: 'Withdrawn', color: '#6b7280', bg: '#f3f4f6' },
}

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [app, setApp] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [urlLoading, setUrlLoading] = useState(false)

  useEffect(() => {
    loadApp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function loadApp() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`*, resume:resumes(*)`)
        .eq('id', id)
        .single()
      if (error) throw error
      setApp(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load application')
    } finally {
      setLoading(false)
    }
  }

  async function openResume() {
    if (!app?.resume?.file_path) return
    setUrlLoading(true)
    try {
      const url = await getResumeSignedUrl(app.resume.file_path)
      if (url) window.open(url, '_blank')
    } catch (err) {
      console.error(err)
      alert('Failed to open resume')
    } finally {
      setUrlLoading(false)
    }
  }

  if (loading) {
    return <DetailSkeleton />
  }

  if (error || !app) {
    return (
      <div className="detail">
        <div className="detail-inner">
          <div className="detail-card" style={{ padding: 32, textAlign: 'center', color: 'var(--muted)' }}>
            <p>{error || 'Application not found'}</p>
            <button className="dash-btn dash-btn-primary" style={{ marginTop: 12 }} onClick={() => navigate('/')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const st = STATUS[app.status] || { label: app.status, color: '#6b7280', bg: '#f3f4f6' }

  return (
    <div className="detail">
      <div className="detail-inner">
        <div className="detail-top">
          <button className="detail-back" onClick={() => navigate('/')}>
            ← Back to Dashboard
          </button>
          <button className="dash-btn dash-btn-ghost" onClick={() => navigate(`/app/${app.id}/edit`)}>
            Edit
          </button>
        </div>

        <div className="detail-card">
          <div className="detail-hero">
            <AuthLottieSequence />
            <div className="detail-hero-content">
              <h1>{app.job_title}</h1>
              <p>{app.company}</p>
            </div>
          </div>

          <div className="detail-body">
            <div className="detail-grid" style={{ marginBottom: 24 }}>
              <div className="detail-section">
                <div className="detail-label">Status</div>
                <span className="detail-pill" style={{ color: st.color, background: `color-mix(in srgb, ${st.color} 14%, transparent)` }}>
                  <span className="dot"></span>
                  {st.label}
                </span>
              </div>
              <div className="detail-section">
                <div className="detail-label">Applied</div>
                <div className="detail-value">
                  {app.applied_date ? new Date(app.applied_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}
                </div>
              </div>
              {app.screening_date && (
                <div className="detail-section">
                  <div className="detail-label">Screening</div>
                  <div className="detail-value">
                    {new Date(app.screening_date).toLocaleString(undefined, {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              )}
              {app.interview_date && (
                <div className="detail-section">
                  <div className="detail-label">Interview</div>
                  <div className="detail-value">
                    {new Date(app.interview_date).toLocaleString(undefined, {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                    {app.interview_location ? ` · ${app.interview_location}` : ''}
                  </div>
                </div>
              )}
              {app.follow_up_date && (
                <div className="detail-section">
                  <div className="detail-label">Follow Up</div>
                  <div className="detail-value">
                    {new Date(app.follow_up_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              )}
            </div>

            {app.job_url && (
              <div className="detail-section">
                <div className="detail-label">Job URL</div>
                <a className="detail-link" href={app.job_url} target="_blank" rel="noopener noreferrer">
                  {app.job_url}
                </a>
              </div>
            )}

            {app.notes && (
              <div className="detail-section">
                <div className="detail-label">Notes</div>
                <div className="detail-value">{app.notes}</div>
              </div>
            )}

            {app.job_description && (
              <div className="detail-section">
                <div className="detail-label">Job Description</div>
                <div
                  className="detail-value"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: 16, maxHeight: 320, overflowY: 'auto' }}
                >
                  {app.job_description}
                </div>
              </div>
            )}

            <div className="detail-section">
              <div className="detail-label">Resume</div>
              {app.resume ? (
                <div className="detail-resume">
                  <span style={{ fontSize: 18 }}>📄</span>
                  <span className="detail-resume-name">{app.resume.file_name}</span>
                  <button className="dash-btn dash-btn-primary" onClick={openResume} disabled={urlLoading}>
                    {urlLoading ? 'Opening…' : 'Open Resume'}
                  </button>
                </div>
              ) : (
                <div className="detail-value" style={{ color: 'var(--muted)' }}>No resume attached</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
