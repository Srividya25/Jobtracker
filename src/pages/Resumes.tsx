import { useEffect, useState, useRef } from 'react'
import {
  supabase,
  getResumes,
  uploadResume,
  createResumeRecord,
  getResumeSignedUrl,
  deleteResumeAndFile,
  type Resume,
} from '../lib/supabase'
import { ResumesSkeleton, minDelay } from '../components/Skeleton'
import './resumes.css'

export default function Resumes() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const started = Date.now()
    getResumes()
      .then(setResumes)
      .catch((e) => console.error(e))
      .finally(async () => {
        await minDelay(started)
        setLoading(false)
      })
  }, [])

  async function handleUpload(file: File) {
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are accepted.')
      return
    }
    setError('')
    setUploading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')
      const { path, fileName } = await uploadResume(file, user.id)
      const record = await createResumeRecord({ user_id: user.id, file_name: fileName, file_path: path })
      setResumes((prev) => [record, ...prev])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleView(r: Resume) {
    try {
      const url = await getResumeSignedUrl(r.file_path)
      window.open(url, '_blank')
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to open resume')
    }
  }

  async function handleDelete(r: Resume) {
    if (!window.confirm(`Delete "${r.file_name}"? This cannot be undone.`)) return
    try {
      await deleteResumeAndFile(r.id, r.file_path)
      setResumes((prev) => prev.filter((x) => x.id !== r.id))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  return (
    <div className="resumes">
      <div className="resumes-inner">
        <div className="resumes-head">
          <div>
            <h1>Resume Library</h1>
            <p>All resumes used across your applications</p>
          </div>
        </div>

        {error && (
          <div style={{ background: 'var(--danger-soft)', color: 'var(--danger)', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div className="resume-upload" onClick={() => fileInputRef.current?.click()}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
          {uploading ? 'Uploading…' : '⬆ Click to upload a new resume (PDF)'}
        </div>

        <div className="resume-list">
          {loading ? (
            <ResumesSkeleton />
          ) : resumes.length === 0 ? (
            <div className="resume-empty">No resumes yet. Upload one above.</div>
          ) : (
            resumes.map((r) => (
              <div key={r.id} className="resume-row">
                <div className="resume-icon">📄</div>
                <div className="resume-info">
                  <div className="resume-name">{r.file_name}</div>
                  <div className="resume-date">
                    Uploaded {new Date(r.uploaded_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className="resume-actions">
                  <button className="dash-btn dash-btn-ghost" onClick={() => handleView(r)}>
                    View
                  </button>
                  <button
                    className="dash-btn dash-btn-ghost"
                    style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
                    onClick={() => handleDelete(r)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
