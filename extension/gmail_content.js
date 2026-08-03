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

const KEYWORDS_ASSESSMENT = [
  'online assessment',
  'assessment',
  'coding challenge',
  'hackerrank',
  'codesignal',
]
const KEYWORDS_INTERVIEW = [
  'interview',
  'technical screen',
  'phone screen',
  'schedule',
  'availability',
]
const OA = /\boa\b/i

function detectType(text) {
  const t = ' ' + String(text || '').toLowerCase() + ' '
  const hasAssessment = KEYWORDS_ASSESSMENT.some((k) => t.includes(k))
  const hasOa = OA.test(t)
  const hasInterview = KEYWORDS_INTERVIEW.some((k) => t.includes(k))
  if (hasAssessment || hasOa) return 'assessment'
  if (hasInterview) return 'interview'
  return null
}

// Convert Gmail's relative/compact dates ("2:15 PM", "Yesterday",
// "Aug 2", "Aug 2, 2026") into an ISO timestamp. Falls back to null.
function parseGmailDate(str) {
  const s = String(str || '').trim()
  if (!s) return null
  const now = new Date()
  const timeMatch = s.match(/^([0-9]{1,2}):([0-9]{2})\s*(am|pm)?/i)
  if (timeMatch) {
    let h = Number(timeMatch[1])
    const m = Number(timeMatch[2])
    const ap = (timeMatch[3] || '').toLowerCase()
    if (ap === 'pm' && h < 12) h += 12
    if (ap === 'am' && h === 12) h = 0
    const d = new Date(now)
    d.setHours(h, m, 0, 0)
    return d.toISOString()
  }
  if (/yesterday/i.test(s)) {
    const d = new Date(now)
    d.setDate(d.getDate() - 1)
    d.setHours(12, 0, 0, 0)
    return d.toISOString()
  }
  // "Aug 2" or "Aug 2, 2026" or "2 Aug"
  const withYear = /,/.test(s) ? s : `${s}, ${now.getFullYear()}`
  const parsed = new Date(withYear)
  if (!isNaN(parsed.getTime())) return parsed.toISOString()
  return null
}

function readEmails() {
  const emails = []
  let rows = document.querySelectorAll('tr.zA, tr.zE')
  if (!rows.length) {
    const main = document.querySelector('div[role="main"]')
    if (main) rows = main.querySelectorAll('tr')
  }
  for (const row of rows) {
    const subjectEl =
      row.querySelector('.y6 .bog') ||
      row.querySelector('span[class*="bog"]') ||
      row.querySelector('.y6 span') ||
      row.querySelector('.y6')
    const subject = subjectEl ? subjectEl.textContent.trim() : ''
    if (!subject) continue

    const senderEl =
      row.querySelector('span[email]') || row.querySelector('.xY') || row.querySelector('.yX')
    const sender = senderEl
      ? (senderEl.getAttribute('email') || senderEl.getAttribute('name') || senderEl.textContent || '').trim()
      : ''

    const snippetEl = row.querySelector('.y6 .y2') || row.querySelector('.y6 .y1')
    let snippet = snippetEl ? snippetEl.textContent.trim() : ''
    if (!snippet && subjectEl && subjectEl.parentElement) {
      snippet = subjectEl.parentElement.textContent.replace(subject, '').trim()
    }

    const timeEl =
      row.querySelector('.xW span[title]') ||
      row.querySelector('.xW') ||
      row.querySelector('span[title]')
    const dateStr = timeEl ? (timeEl.getAttribute('title') || timeEl.textContent || '') : ''
    const date = parseGmailDate(dateStr) || new Date().toISOString()

    emails.push({ sender, subject, snippet, date })
  }
  return emails
}

function diagnoseGmail() {
  const main = document.querySelector('div[role="main"]')
  const rows = document.querySelectorAll('tr')
  const emailish = Array.from(rows).find(
    (r) => r.querySelector('span[email]') || r.querySelector('.y6') || r.querySelector('tr.zA, tr.zE')
  )
  return {
    totalTr: rows.length,
    zARows: document.querySelectorAll('tr.zA, tr.zE').length,
    y6Rows: document.querySelectorAll('.y6').length,
    emailAttr: document.querySelectorAll('span[email]').length,
    mainExists: !!main,
    mainTr: main ? main.querySelectorAll('tr').length : 0,
    sample: emailish ? emailish.outerHTML.slice(0, 400) : '',
  }
}

async function scanAndSave() {
  const stats = {
    lastRun: null,
    rows: 0,
    matches: 0,
    saved: 0,
    error: '',
    debug: null,
  }
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session?.user) {
      stats.error = 'Not signed in'
      chrome.storage.local.set({ gmailScan: stats })
      return
    }
    const emails = readEmails()
    stats.rows = emails.length
    stats.debug = diagnoseGmail()
    for (const email of emails) {
      const detectedType = detectType(email.subject + ' ' + email.snippet)
      if (!detectedType) continue
      stats.matches++
      const { error } = await supabase
        .from('email_events')
        .insert(
          {
            user_id: session.user.id,
            email_subject: email.subject.slice(0, 500),
            email_sender: email.sender.slice(0, 500),
            email_snippet: email.snippet.slice(0, 2000),
            email_date: email.date,
            detected_type: detectedType,
          },
          {
            onConflict: 'user_id,email_subject,email_sender,email_date',
            ignoreDuplicates: true,
          }
        )
      if (error && !error.message.includes('duplicate')) {
        stats.error = error.message
      } else {
        stats.saved++
      }
    }
  } catch (err) {
    stats.error = err?.message || 'Error'
  } finally {
    stats.lastRun = new Date().toISOString()
    chrome.storage.local.set({ gmailScan: stats })
  }
}

// Start scanning once the Gmail UI is present, then periodically.
// The feature is opt-in: it only scans when the user has enabled the
// "Gmail detection" toggle in the popup (default OFF).
const start = async () => {
  const stored = await new Promise((resolve) => {
    chrome.storage.local.get('gmailEnabled', (r) => resolve(r))
  })
  if (!stored.gmailEnabled) return
  scanAndSave()
}
setTimeout(start, 4000)
setInterval(start, 15000)
