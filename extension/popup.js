import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: {
      getItem: async (key) => {
        return new Promise((resolve) => {
          chrome.storage.local.get(key, (r) => resolve(r[key] ?? null))
        })
      },
      setItem: async (key, value) => {
        return new Promise((resolve) => {
          chrome.storage.local.set({ [key]: value }, resolve)
        })
      },
      removeItem: async (key) => {
        return new Promise((resolve) => {
          chrome.storage.local.remove(key, resolve)
        })
      },
    },
  },
})

let currentUser = null
let currentFile = null

const $ = (id) => document.getElementById(id)

function showView(id) {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'))
  $(id).classList.add('active')
}

function showError(id, msg) {
  const el = $(id)
  el.textContent = msg
  el.style.display = msg ? 'block' : 'none'
}

function showSuccess(id, msg) {
  const el = $(id)
  el.textContent = msg
  el.style.display = msg ? 'block' : 'none'
}

async function init() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session?.user) {
    currentUser = session.user
    showForm()
  } else {
    showView('viewLogin')
  }
}

async function handleLogin() {
  const email = $('loginEmail').value.trim()
  const password = $('loginPassword').value
  if (!email || !password) return showError('loginError', 'Enter email and password')
  showError('loginError', '')
  $('loginBtn').disabled = true
  $('loginBtn').textContent = 'Signing in...'
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  $('loginBtn').disabled = false
  $('loginBtn').textContent = 'Sign In'
  if (error) return showError('loginError', error.message)
  const { data: { user } } = await supabase.auth.getUser()
  currentUser = user
  showForm()
}

async function handleSignup() {
  const email = $('signupEmail').value.trim()
  const password = $('signupPassword').value
  if (!email || !password) return showError('signupError', 'Enter email and password')
  showError('signupError', '')
  $('signupBtn').disabled = true
  $('signupBtn').textContent = 'Signing up...'
  const { error } = await supabase.auth.signUp({ email, password })
  $('signupBtn').disabled = false
  $('signupBtn').textContent = 'Sign Up'
  if (error) return showError('signupError', error.message)
  $('loginEmail').value = email
  $('loginPassword').value = ''
  showView('viewLogin')
  showError('loginError', 'Check your email for the confirmation link, then sign in.')
}

async function handleLogout() {
  await supabase.auth.signOut()
  chrome.storage.local.remove('supabase.auth.token')
  currentUser = null
  showView('viewLogin')
}

async function showForm() {
  showView('viewForm')
  $('statusBar').style.display = 'flex'
  $('userEmail').textContent = currentUser?.email || ''
  $('fieldDate').value = new Date().toISOString().split('T')[0]

  // Request scrape from content script
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab?.id) {
      const result = await chrome.tabs.sendMessage(tab.id, { type: 'SCRAPE' })
      if (result) {
        if (result.job_title) $('fieldTitle').value = result.job_title
        if (result.company) $('fieldCompany').value = result.company
        if (result.job_url) $('fieldUrl').value = result.job_url
        if (result.job_description) $('fieldDescription').value = result.job_description
      }
    }
  } catch (_e) {
    // content script not available on this page; fields stay blank
  }
}

async function handleSave() {
  const title = $('fieldTitle').value.trim()
  const company = $('fieldCompany').value.trim()
  const url = $('fieldUrl').value.trim()
  const description = $('fieldDescription').value.trim()
  const status = $('fieldStatus').value
  const appliedDate = $('fieldDate').value

  if (!title || !company) return showError('formError', 'Job title and company are required')
  showError('formError', '')
  showSuccess('formSuccess', '')
  $('saveBtn').disabled = true
  $('saveBtn').textContent = 'Saving...'

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    let resumeId = null
    if (currentFile) {
      const fileExt = currentFile.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, currentFile, { contentType: currentFile.type, upsert: false })
      if (uploadError) throw uploadError

      const { data: resumeRecord, error: resumeError } = await supabase
        .from('resumes')
        .insert({ user_id: user.id, file_name: currentFile.name, file_path: filePath })
        .select()
        .single()
      if (resumeError) throw resumeError
      resumeId = resumeRecord.id
    }

    const { error: insertError } = await supabase.from('applications').insert({
      user_id: user.id,
      company,
      job_title: title,
      job_url: url || null,
      job_description: description || null,
      status,
      applied_date: appliedDate,
      resume_id: resumeId,
    })
    if (insertError) throw insertError

    $('savedInfo').textContent = `${title} at ${company}`
    showView('viewSaved')
  } catch (err) {
    showError('formError', err.message || 'Failed to save')
  } finally {
    $('saveBtn').disabled = false
    $('saveBtn').textContent = 'Save'
  }
}

// --- DOM event wiring ---

document.addEventListener('DOMContentLoaded', () => {
  init()
})

$('loginBtn').addEventListener('click', handleLogin)
$('loginPassword').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleLogin() })
$('showSignup').addEventListener('click', (e) => { e.preventDefault(); showView('viewSignup') })
$('showLogin').addEventListener('click', (e) => { e.preventDefault(); showView('viewLogin') })
$('signupBtn').addEventListener('click', handleSignup)
$('signOutBtn').addEventListener('click', handleLogout)
$('saveBtn').addEventListener('click', handleSave)
$('closeBtn').addEventListener('click', () => window.close())
$('savedOkBtn').addEventListener('click', () => window.close())

$('uploadZone').addEventListener('click', () => $('resumeInput').click())
$('resumeInput').addEventListener('change', (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.type !== 'application/pdf') return showError('formError', 'Only PDF files are accepted')
  currentFile = file
  $('resumeName').textContent = file.name
  $('uploadZone').classList.add('has-file')
  $('uploadZone').textContent = 'Change file'
  showError('formError', '')
})
