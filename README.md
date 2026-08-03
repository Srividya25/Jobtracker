# JobTracker

A job application tracker built with React + Supabase. Track your applications across a dashboard, kanban pipeline, and resume library — plus an optional Chrome extension that scrapes job postings straight into your tracker.

![stack](https://img.shields.io/badge/React-18-blue) ![stack](https://img.shields.io/badge/Supabase-2.45-green) ![stack](https://img.shields.io/badge/Vite-5-purple)

## Features

- **Dashboard** — application stats, 12-week activity chart, search & filter, upcoming interviews, CSV export
- **Kanban pipeline** — drag applications between Applied / Screening / Interview / Offer / Accepted / Rejected / Withdrawn
- **Resume library** — upload PDFs, preview them, link one to each application
- **Application details** — job URL, description, notes, follow-up date, interview date & location
- **Dark mode** — toggle in the top-right corner (remembered per device)
- **Emails tab (optional)** — interview & assessment emails detected from Gmail, with New / Done / Dismissed filters; handled emails auto-clear after a year (see [EMAIL_SETUP.md](EMAIL_SETUP.md))
- **Chrome extension** — one click on a job posting to save the job title, company, and description

## How accounts work

Every user signs up with an email + password. Each account's data is **fully isolated** — row-level security means you can only ever see your own applications and resumes. No shared data.

## Run it yourself (5 minutes)

You need **Node.js 18+** (https://nodejs.org) and a free **Supabase account** (https://supabase.com).

### 1. Get the code

```
git clone https://github.com/Srividya25/Jobtracker.git
cd Jobtracker
npm install
```

### 2. Create your own Supabase project

1. Go to https://supabase.com and sign up / log in.
2. Click **New project**, pick a name (e.g. "jobtracker"), set a strong database password, and create it.
3. Wait for the project to finish provisioning.

### 3. Run the database setup

1. In your Supabase project, go to **SQL Editor** (left sidebar).
2. Click **New query**, open the file `setup.sql` from this repo, copy its entire contents, and paste them in.
3. Click **Run**. (This creates the tables, security rules, and the private "resumes" storage bucket — all in one go. It also sets up the optional email-detection table, which **stays dormant** unless you enable it — see the optional section below.)
4. Go to **Authentication → Sign In / Providers → Email** and turn off **Confirm email** for easy local testing. A fresh project has this ON by default, which blocks login until you confirm.

### 4. Connect the app to your Supabase

1. In Supabase, go to **Project Settings → API**.
2. Copy the **Project URL** and the **anon / public key**.
3. In the project folder, create a file named `.env` (the `.env.example` file shows the format):

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ The URL is just `https://your-project-id.supabase.co` — do not add `/rest/v1/` or a trailing slash.

### 5. Run it

```
npm run dev
```

Open the printed URL (usually `http://localhost:5173`), click **Sign up**, and you're in.

## Optional: Chrome extension

The extension lets you save a job posting from the browser with one click.

> **Optional:** Detect interview/assessment emails from Gmail automatically and manage them in the **Emails** tab — see [EMAIL_SETUP.md](EMAIL_SETUP.md). Email detection is **off by default**: even with the extension loaded and Gmail open, nothing is scanned until you enable the **"Gmail detection"** toggle in the extension popup.

1. Install dependencies once: `npm install`
2. Create `extension/config.js` from `extension/config.example.js` and paste **your** Supabase Project URL and anon key.
3. Build it: `npm run build:ext`
4. Open `chrome://extensions`, turn on **Developer mode**, click **Load unpacked**, and select the `extension/dist` folder.
5. Open any job page (LinkedIn, Indeed, company career pages, etc.) and click the JobTracker icon to save it.

> The popup uses your Supabase keys, so each person builds their own extension against their own project.

## Project structure

```
jobtracker/
├── setup.sql              # One-shot Supabase setup (tables, RLS, storage)
├── src/                   # React app
│   ├── pages/             # Dashboard, Kanban, Resumes, Form, Detail
│   ├── components/        # Layout, ProtectedRoute, etc.
│   ├── context/           # Auth + Theme
│   └── lib/supabase.ts    # Supabase client + API helpers
└── extension/             # Chrome extension (MV3)
    ├── content.js         # Job page scraper
    ├── popup.js           # Popup UI + logic
    └── build.cjs          # Build script → extension/dist
```
