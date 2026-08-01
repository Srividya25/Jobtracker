;(() => {
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
        if (!txt || txt.length > 60) return
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

  // Parse JSON-LD structured data (very reliable on most job boards)
  function fromJsonLd() {
    let out = { title: '', company: '', description: '' }
    try {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      for (const s of scripts) {
        let data
        try {
          data = JSON.parse(s.textContent)
        } catch {
          continue
        }
        const items = Array.isArray(data) ? data : [data]
        for (const item of items) {
          const job = item['@type'] === 'JobPosting' ? item : null
          if (!job) continue
          if (!out.title && job.title) out.title = job.title
          if (!out.company && job.hiringOrganization) {
            const org = typeof job.hiringOrganization === 'string' ? job.hiringOrganization : job.hiringOrganization.name
            if (org) out.company = org
          }
          if (!out.description && job.description) {
            out.description = job.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
          }
          if (out.title && out.company && out.description) return out
        }
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

  function scrape() {
    // ---- Best source first: JSON-LD structured data ----
    const ld = fromJsonLd()

    // If a modal is open (Easy Apply etc.), scrape it first — that's what the
    // user is looking at. Fall back to the page body if the modal is empty.
    const dialog = openDialog()

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
    if (!title) title = stripNoise(ld.title)
    if (!title) {
      const titleEl = first([
        'h1[data-automation="job-title"]',
        'h1[data-automation-id="job-title"]',
        'h1[class*="title"]',
        '.job-title',
        '.posting-title h1',
        '.app-title',
        '.jobsearch-JobInfoHeader-title',
        '.jobs-unified-top-card__job-title',
        '[data-testid="job-title"]',
        '[itemprop="title"]',
        '.top-card-layout__title',
        'h1',
      ])
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
        if (txt && txt.length <= 60) company = stripNoise(txt)
      }
    }
    if (!company) company = stripNoise(ld.company)
    if (!company) {
      const ogSite = getMetaContent('site_name')
      if (ogSite) company = ogSite
    }
    if (!company || company.length > 60) {
      company = bestCompany([
        '[data-automation="company-name"]',
        '[data-automation-id="company-name"]',
        '.jobsearch-InlineCompanyRating [aria-label]',
        '.posting-company',
        '.company-name',
        '.jobsearch-JobInfoHeader-company-name',
        '.jobs-unified-top-card__company-name',
        '.jobs-unified-top-card__company-name a',
        '[itemprop="hiringOrganization"]',
        '[data-testid="company-name"]',
        '.topcard__org-name-link',
        '.top-card-layout__second-subline',
        '[class*="company-name"]',
        '[class*="CompanyName"]',
        'a[href*="company"] strong',
        'a[href*="/companies/"]',
        '[class*="employer"]',
      ])
      if (company && company.length > 60) company = ''
    }

    // ---- Job description ----
    let description = stripNoise(ld.description)
    if (!description || description.length <= 50) {
      const descEl = first([
        '[data-automation="jobDescriptionText"]',
        '[data-automation-id="job-description"]',
        '[data-automation-id="jobPostingDescription"]',
        '.jobs-description__content',
        '.jobs-box__html-content',
        '.show-more-less-html__markup',
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
        'article',
      ])
      if (descEl) {
        const txt = descEl.textContent.trim()
        if (txt.length > 50) description = txt
      }
    }

    // Fallback: largest text block in the main content area
    if (!description || description.length <= 50) {
      const block = largestTextBlock([
        'main',
        'article',
        '[class*="description"]',
        '[class*="Description"]',
        '[class*="job-content"]',
        '[class*="JobContent"]',
        '[class*="details"]',
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
