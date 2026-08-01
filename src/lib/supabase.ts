import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Resume {
  id: string
  user_id: string
  file_name: string
  file_path: string
  uploaded_at: string
}

export interface Application {
  id: string
  user_id: string
  company: string
  job_title: string
  job_url: string | null
  job_description: string | null
  status: string
  applied_date: string
  resume_id: string | null
  notes: string | null
  follow_up_date: string | null
  interview_date: string | null
  interview_location: string | null
  created_at: string
  resume?: Resume | null
}

// Resume helpers
export async function uploadResume(file: File, userId: string): Promise<{ path: string; fileName: string }> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`
  const filePath = `${userId}/${fileName}`

  const { error } = await supabase.storage.from('resumes').upload(filePath, file, {
    contentType: file.type,
    upsert: false,
  })

  if (error) throw error
  return { path: filePath, fileName: file.name }
}

export async function deleteResume(filePath: string) {
  const { error } = await supabase.storage.from('resumes').remove([filePath])
  if (error) throw error
}

export function getResumePublicUrl(filePath: string) {
  const { data } = supabase.storage.from('resumes').getPublicUrl(filePath)
  return data.publicUrl
}

// Application helpers
export async function createApplication(
  app: Omit<Application, 'id' | 'user_id' | 'created_at' | 'resume'>
) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('applications')
    .insert({ ...app, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      resume:resumes(*)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as (Application & { resume: Resume | null })[]
}

export async function getApplication(id: string) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      resume:resumes(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Application & { resume: Resume | null }
}

export async function updateApplication(id: string, updates: Partial<Application>) {
  const { data, error } = await supabase
    .from('applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteApplication(id: string) {
  const { error } = await supabase.from('applications').delete().eq('id', id)
  if (error) throw error
}

// Resume library helpers
export async function getResumes() {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .order('uploaded_at', { ascending: false })

  if (error) throw error
  return data as Resume[]
}

export async function createResumeRecord(resume: Omit<Resume, 'id' | 'uploaded_at'>) {
  const { data, error } = await supabase
    .from('resumes')
    .insert(resume)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteResumeRecord(id: string) {
  const { error } = await supabase.from('resumes').delete().eq('id', id)
  if (error) throw error
}

export async function getResumeSignedUrl(filePath: string, expiresIn = 3600) {
  const { data, error } = await supabase.storage.from('resumes').createSignedUrl(filePath, expiresIn)
  if (error) throw error
  return data.signedUrl
}

export async function deleteResumeAndFile(id: string, filePath: string) {
  const { error: fileError } = await supabase.storage.from('resumes').remove([filePath])
  if (fileError) throw fileError
  await deleteResumeRecord(id)
}

// Export all applications as a CSV download
export function exportApplicationsToCSV(applications: Application[]) {
  const headers = ['Company', 'Job Title', 'Status', 'Applied Date', 'Job URL', 'Interview Date', 'Interview Location', 'Follow-up Date', 'Notes', 'Job Description']
  const escape = (v: string | null | undefined) => {
    if (!v) return ''
    return `"${String(v).replace(/"/g, '""')}"`
  }
  const rows = applications.map((a) =>
    [
      escape(a.company),
      escape(a.job_title),
      escape(a.status),
      escape(a.applied_date),
      escape(a.job_url),
      escape(a.interview_date),
      escape(a.interview_location),
      escape(a.follow_up_date),
      escape(a.notes),
      escape(a.job_description),
    ].join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `jobtracker-export-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}