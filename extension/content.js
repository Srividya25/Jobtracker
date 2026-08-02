;(() => {
  // Known ATS / job-platform names that are never the actual employer.
  const PLATFORM_NAMES = [
    'workday', 'myworkdayjobs', 'greenhouse', 'lever', 'ashby', 'smartrecruiters',
    'icims', 'taleo', 'bullhorn', 'phenom', 'successfactors', 'bamboohr', 'jazzhr',
    'jobvite', 'eightfold', 'hirevue', 'ziprecruiter', 'indeed', 'glassdoor',
    'careerbuilder', 'monster', 'linkedin', 'simplify', 'getro', 'ukg',
  ]

  function isBlockedCompany(name) {
    if (!name) return false
    const n = name.toLowerCase()
    if (PLATFORM_NAMES.some((b) => n.includes(b))) return true
    if (
      n.length < 40 &&
      /staffing|recruiting|recruitment|employment agency|talent solutions|workforce solutions|executive search|headhunt|temporary agency|temp agency/.test(n)
    ) {
      return true
    }
    return false
  }

  function getMetaContent(name) {
    const el =
      document.querySelector(`meta[property="${name}"]`) ||
      document.querySelector(`meta[name="${name}"]`) ||
      document.querySelector(`meta[property="og:${name}"]`)
    return el ? el.getAttribute('content') || '' : ''
  }

  function first(selectors) {
    for (const sel of selectors) {
      const el = document.querySelector(sel)
      if (el && el.textContent.trim()) return el
    }
    return null
  }

  // Company names are short. Pick the shortest reasonable candidate.
  function bestCompany(selectors) {
    let best = ''
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        let txt = el.textContent.trim()
        txt = txt
          .replace(/\s*\|.*$/, '')
          .replace(/\s*•.*$/, '')
          .replace(/\s*\n.*$/s, '')
          .replace(/^[0-9.,+\s]+$/, '')
          .trim()
        if (!txt || txt.length < 2 || txt.length > 60) return
        if (isBlockedCompany(txt)) return
        if (!best || txt.length < best.length) best = txt
      })
    }
    return best
  }

  function largestTextBlock(selectors) {
    let best = null
    let bestLen = 0
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        const len = el.textContent.trim().length
        if (len > bestLen) {
          bestLen = len
          best = el
        }
      })
    }
    return best
  }

  // Parse JSON-LD structured data (very reliable on most job boards),
  // including @graph wrappers. A staffing/ATS company is ignored so the
  // fallback selectors get a chance to find the real employer.
  function fromJsonLd() {
    let out = { title: '', company: '', description: '' }
    try {
      const jobs = []
      const stack = []
      document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
        try {
          stack.push(JSON.parse(s.textContent))
        } catch (_e) {
          // malformed JSON — skip this script
        }
      })
      while (stack.length) {
        const node = stack.shift()
        if (Array.isArray(node)) {
          node.forEach((n) => stack.push(n))
          continue
        }
        if (!node || typeof node !== 'object') continue
        const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']]
        if (types.includes('JobPosting')) jobs.push(node)
        if (node['@graph']) stack.push(node['@graph'])
      }
      for (const job of jobs) {
        if (!out.title && job.title) out.title = job.title
        if (!out.company && job.hiringOrganization) {
          const org =
            typeof job.hiringOrganization === 'string'
              ? job.hiringOrganization
              : job.hiringOrganization?.name
          if (org && !isBlockedCompany(org)) out.company = org
        }
        if (!out.description && job.description) {
          out.description = job.description
            .replace(/<[^>]+>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/\s+/g, ' ')
            .trim()
        }
        if (out.title && out.company && out.description) break
      }
    } catch (_e) {}
    return out
  }

  function stripNoise(text) {
    if (!text) return ''
    return text
      .replace(/[\u00a0\u200b\u2028\u2029]+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s*([.,;:!?)])\s*/g, '$1 ')
      .trim()
  }

  // Find an open modal/dialog (e.g. LinkedIn Easy Apply, job detail drawers)
  function openDialog() {
    return (
      document.querySelector('[role="dialog"][aria-modal="true"]') ||
      document.querySelector('[data-test-modal="true"]') ||
      document.querySelector('[aria-modal="true"]') ||
      document.querySelector('.jobs-easy-apply-modal') ||
      document.querySelector('[data-test-easy-apply-modal]')
    )
  }

  // LinkedIn current markup
  const LI_TITLE = [
    '.jobs-unified-top-card__job-title',
    '.job-details-jobs-unified-top-card__job-title',
    'h1[data-automation="jobTitle"]',
    'h1[data-automation="job-title"]',
    'h1',
  ]
  const LI_COMPANY = [
    '.jobs-unified-top-card__company-name',
    '.job-details-jobs-unified-top-card__company-name',
    'a[data-tracking-control-name*="company"]',
    '[data-automation="jobCompany"]',
    'a[href*="/company/"]',
  ]
  const LI_DESC = [
    '.jobs-description__content',
    '.jobs-description-container',
    '.jobs-box__html-content',
    '.show-more-less-html__markup',
    '.jobs-description-content__text',
  ]

  const ATS_TITLE = [
    'h1[data-automation="job-title"]',
    'h1[data-automation-id="job-title"]',
    'h1[class*="title"]',
    '.job-title',
    '.posting-title h1',
    '.app-title',
    '.jobsearch-JobInfoHeader-title',
    '[data-testid="job-title"]',
    '[itemprop="title"]',
    '.top-card-layout__title',
    'h1',
  ]

  const ATS_COMPANY = [
    '[data-automation="company-name"]',
    '[data-automation-id="company-name"]',
    '.jobsearch-InlineCompanyRating [aria-label]',
    '.posting-company',
    '.company-name',
    '.jobsearch-JobInfoHeader-company-name',
    '[itemprop="hiringOrganization"]',
    '[data-testid="company-name"]',
    '.topcard__org-name-link',
    '.top-card-layout__second-subline',
    '[class*="company-name"]',
    '[class*="CompanyName"]',
    '[data-company]',
    '.job-company',
    'a[href*="company"] strong',
    'a[href*="/companies/"]',
    '[class*="employer"]',
  ]

  const ATS_DESC = [
    '[data-automation="jobDescriptionText"]',
    '[data-automation-id="job-description"]',
    '[data-automation-id="jobPostingDescription"]',
    '[data-automation="jobDescription"]',
    '.job-description',
    '.posting-description',
    '.jobsearch-JobComponent-description',
    '.jobsearch-jobDescriptionText',
    '[itemprop="description"]',
    '[data-testid="job-description"]',
    '.jobDescriptionContent',
    '#jobDescription',
    '.description__text',
    '#job-description',
    '.js-job-description',
    '.jobDescription',
    '.job-post-description',
    'article',
  ]

  function scrape() {
    const isLinkedIn = window.location.hostname.includes('linkedin.com')
    const isLinkedInJobPage = isLinkedIn && /\/jobs\//.test(window.location.pathname)

    // On LinkedIn job pages, prefer the job details page behind any
    // Easy Apply modal — that's where the real title/company/description live.
    const ld = fromJsonLd()
    const dialog = isLinkedInJobPage ? null : openDialog()

    // ---- Job title ----
    let title = ''
    if (dialog) {
      const scoped = (sel) => dialog.querySelector(sel)
      const scopedTitle =
        scoped('[data-test-easy-apply-title]') ||
        scoped('.jobs-easy-apply-title') ||
        scoped('h1') ||
        scoped('h2') ||
        scoped('h3')
      if (scopedTitle) title = stripNoise(scopedTitle.textContent)
    }
    if (!title && isLinkedInJobPage) {
      const titleEl = first(LI_TITLE)
      if (titleEl) title = stripNoise(titleEl.textContent)
    }
    if (!title) title = stripNoise(ld.title)
    if (!title) {
      const titleEl = first(ATS_TITLE)
      if (titleEl) title = stripNoise(titleEl.textContent)
    }
    if (!title) title = document.title.replace(/ - .*$/, '').replace(/ \| .*$/, '').trim()

    // ---- Company name ----
    let company = ''
    if (dialog) {
      const scoped = (sel) => dialog.querySelector(sel)
      const companyEl =
        scoped('[data-test-easy-apply-company]') ||
        scoped('.jobs-easy-apply-modal [class*="company"]') ||
        scoped('[class*="company-name"]') ||
        scoped('[class*="Company"]') ||
        scoped('[itemprop="name"]')
      if (companyEl) {
        let txt = companyEl.textContent.trim()
        if (txt && txt.length <= 60 && !isBlockedCompany(txt)) company = stripNoise(txt)
      }
    }
    if (!company && isLinkedInJobPage) {
      const companyEl = first(LI_COMPANY)
      if (companyEl) {
        let txt = companyEl.textContent.trim()
        if (txt && txt.length <= 60 && !isBlockedCompany(txt)) company = stripNoise(txt)
      }
    }
    if (!company) company = stripNoise(ld.company)
    if (!company) company = bestCompany(ATS_COMPANY)
    if (!company) {
      const ogSite = getMetaContent('site_name')
      if (ogSite && !isBlockedCompany(ogSite)) company = ogSite
    }
    if (company && company.length > 60) company = ''

    // ---- Job description ----
    let description = stripNoise(ld.description)
    if (!description || description.length <= 50) {
      for (const sel of [...LI_DESC, ...ATS_DESC]) {
        const el = document.querySelector(sel)
        if (!el) continue
        const txt = el.textContent.trim()
        if (txt.length > 50) {
          description = txt
          break
        }
      }
    }
    if (!description || description.length <= 50) {
      const block = largestTextBlock([
        'main',
        'article',
        '[class*="description"]',
        '[class*="Description"]',
        '[class*="job-content"]',
        '[class*="JobContent"]',
        '[class*="details"]',
        '[class*="Details"]',
        '#content',
      ])
      if (block) {
        const text = block.textContent.trim()
        if (text.length > 200) description = text
      }
    }

    const result = {
      job_title: title,
      company,
      job_url: window.location.href,
      job_description: description.substring(0, 10000),
    }

    chrome.runtime.sendMessage({ type: 'SCRAPE_RESULT', data: result })
    return result
  }

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'SCRAPE') {
      const result = scrape()
      sendResponse(result)
    }
  })
})()
