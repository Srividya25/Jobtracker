import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase, createApplication, updateApplication, getResumes, uploadResume, createResumeRecord } from '../lib/supabase'
import './form.css'

const STATUSES = ['applied', 'screening', 'interview', 'offer', 'accepted', 'rejected', 'withdrawn']

type FormData = {
  company: string
  job_title: string
  job_url: string
  job_description: string
  status: string
  applied_date: string
  resume_id: string | null
  notes: string
  follow_up_date: string
  screening_date: string
  interview_date: string
  interview_location: string
}

const EMPTY: FormData = {
  company: '',
  job_title: '',
  job_url: '',
  job_description: '',
  status: 'applied',
  applied_date: new Date().toISOString().split('T')[0],
  resume_id: null,
  notes: '',
  follow_up_date: '',
  screening_date: '',
  interview_date: '',
  interview_location: '',
}

function toLocalInput(iso: string | null | undefined) {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function ApplicationForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id

  const [form, setForm] = useState<FormData>(EMPTY)
  const [resumes, setResumes] = useState<{ id: string; file_name: string }[]>([])
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadResumes()
    if (isEditing) loadApp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function loadResumes() {
    try {
      const data = await getResumes()
      setResumes(data.map((r) => ({ id: r.id, file_name: r.file_name })))
    } catch (err) {
      console.error(err)
    }
  }

  async function loadApp() {
    try {
      const { data } = await supabase
        .from('applications')
        .select('*, resume:resumes(id, file_name)')
        .eq('id', id)
        .single()
      if (data) {
        setForm({
          company: data.company,
          job_title: data.job_title,
          job_url: data.job_url || '',
          job_description: data.job_description || '',
          status: data.status,
          applied_date: data.applied_date ? data.applied_date.split('T')[0] : '',
          resume_id: data.resume_id,
          notes: data.notes || '',
          follow_up_date: data.follow_up_date ? data.follow_up_date.split('T')[0] : '',
          screening_date: toLocalInput(data.screening_date),
          interview_date: toLocalInput(data.interview_date),
          interview_location: data.interview_location || '',
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handleResumeUpload(file: File) {
    setLoading(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')
      const { path, fileName } = await uploadResume(file, user.id)
      const record = await createResumeRecord({
        user_id: user.id,
        file_name: fileName,
        file_path: path,
      })
      setResumes((prev) => [{ id: record.id, file_name: record.file_name }, ...prev])
      setForm((prev) => ({ ...prev, resume_id: record.id }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        company: form.company,
        job_title: form.job_title,
        job_url: form.job_url || null,
        job_description: form.job_description || null,
        status: form.status,
        applied_date: form.applied_date,
        resume_id: form.resume_id,
        notes: form.notes || null,
        follow_up_date: form.follow_up_date || null,
        screening_date: form.screening_date ? new Date(form.screening_date).toISOString() : null,
        interview_date: form.interview_date ? new Date(form.interview_date).toISOString() : null,
        interview_location: form.interview_location || null,
      }
      if (isEditing) {
        await updateApplication(id!, payload)
      } else {
        await createApplication(payload)
      }
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="form-page">
      <div className="form-inner">
        <div className="form-head">
          <h1>{isEditing ? 'Edit Application' : 'New Application'}</h1>
          <p>{isEditing ? 'Update the details of this application.' : 'Track a job you applied to.'}</p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full">
              <label>Company <span className="req">*</span></label>
              <input name="company" value={form.company} onChange={handleChange} required placeholder="e.g. Acme Inc." />
            </div>
            <div className="form-group full">
              <label>Job Title <span className="req">*</span></label>
              <input name="job_title" value={form.job_title} onChange={handleChange} required placeholder="e.g. Frontend Engineer" />
            </div>
            <div className="form-group full">
              <label>Job URL</label>
              <input name="job_url" type="url" value={form.job_url} onChange={handleChange} placeholder="https://…" />
            </div>
            <div className="form-group full">
              <label>Job Description</label>
              <textarea name="job_description" value={form.job_description} onChange={handleChange} rows={6} placeholder="Paste the job description here…" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Applied Date</label>
              <input name="applied_date" type="date" value={form.applied_date} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Screening Date</label>
              <input name="screening_date" type="datetime-local" value={form.screening_date} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Interview Date</label>
              <input name="interview_date" type="datetime-local" value={form.interview_date} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Interview Location</label>
              <input name="interview_location" value={form.interview_location} onChange={handleChange} placeholder="e.g. Video call / Office address" />
            </div>
            <div className="form-group">
              <label>Follow-up Date</label>
              <input name="follow_up_date" type="date" value={form.follow_up_date} onChange={handleChange} />
            </div>
            <div className="form-group full">
              <label>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Contacts, recruiter info, prep notes…" />
            </div>
            <div className="form-group full">
              <label>Resume</label>
              <select name="resume_id" value={form.resume_id || ''} onChange={handleChange}>
                <option value="">— Select an existing resume —</option>
                {resumes.map((r) => (
                  <option key={r.id} value={r.id}>{r.file_name}</option>
                ))}
              </select>
              <div className="form-upload" onClick={() => fileInputRef.current?.click()}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => e.target.files?.[0] && handleResumeUpload(e.target.files[0])}
                  disabled={loading}
                />
                {loading ? 'Uploading…' : '⬆ Or upload a new PDF resume'}
              </div>
              {form.resume_id && (
                <div className="form-selected">
                  ✓ Selected: {resumes.find((r) => r.id === form.resume_id)?.file_name}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving} className="dash-btn dash-btn-primary">
              {saving ? 'Saving…' : isEditing ? 'Update' : 'Create'}
            </button>
            <button type="button" className="dash-btn dash-btn-ghost" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
