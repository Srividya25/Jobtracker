# EMAIL_SETUP.md — Optional Gmail detection

This is an **optional** feature. The core JobTracker app and the existing
job-save extension work fine whether or not you enable it. If you never open
Gmail, or skip the steps below, nothing changes and nothing errors.

> **The database is already set up from the main install.** Running `setup.sql`
> (README step 3) creates the `email_events` table ahead of time — but it stays
> **empty and unused** until you opt in. Email detection is **OFF by default**;
> even with the extension loaded and Gmail open, nothing is scanned until you
> flip the toggle in the popup. So basic users see only the core tabs
> (Dashboard / Pipeline / Resumes) — the **Emails** tab is hidden until an email
> is actually detected for the account — and email users get the full feature.
> Same SQL, same tables — the feature only comes alive when you opt in.

## What it does

When you have `mail.google.com` open in Chrome with the JobTracker extension
loaded, a content script reads the currently visible emails and flags ones whose
subject or snippet contains job-application keywords (interview, assessment,
online assessment, OA, coding challenge, technical screen, hackerrank,
codesignal, phone screen, schedule, availability). Matches are saved to the
`email_events` table and appear in the **Emails** tab of the app — the tab only
shows in the navigation once you have at least one detected email — so even if
you miss the email, it's visible in your tracker.

There you can filter by **New / Done / Dismissed**, mark an email as **done**
once you've handled it, or **dismiss** it if it isn't relevant. Handled emails
are automatically cleared after one year so the list stays tidy.

Repeated scans of the same email are skipped automatically (dedupe), and your
account can only ever see its own events (row-level security).

## Step 1 — Make sure the database is set up

1. If you haven't already, run `setup.sql` (README **step 3**) in your Supabase
   **SQL Editor**. Safe to re-run — it won't touch your existing data.

That's it for the database — nothing else to create.

## Step 2 — Build and load the extension

1. In the project folder: `npm run build:ext`
2. Open `chrome://extensions`, click the **refresh** icon on JobTracker.
3. Make sure you're **signed in** to JobTracker (open the popup once to confirm).

## Step 3 — Turn on Gmail detection

Gmail detection is **off by default**. To enable it:

1. Open the JobTracker popup (click the extension icon).
2. Check the **"Gmail detection"** toggle. It will now read "Gmail detection · ON".

> Nobody's Gmail is scanned until this toggle is on — so users who just want the
> job tracker can ignore this step entirely.

## Step 4 — Use it

1. Open https://mail.google.com in Chrome.
2. The script scans every ~15 seconds while Gmail is open.
3. Matched emails appear in the **Emails** tab of the app within a few minutes
   (the tab appears in the nav once the first email is saved — refresh the page
   to see it).

## Turning it off

Uncheck the **"Gmail detection"** toggle in the popup. The scanner skips every
scan while it's off, and no new emails are saved. (You can also just not open
Gmail, or remove the extension.)

## Notes

- Matching is keyword-based, so it can produce false positives (e.g. any email
  containing "schedule"). It never deletes or modifies your emails — it only
  reads subject/snippet/sender/date.
- To turn the feature off, uncheck the **"Gmail detection"** toggle in the
  popup, remove the extension, or don't open Gmail. Nothing in the app depends
  on it.
- To tidy the list, use **Done** / **Dismiss** on the Emails tab. Done and
  dismissed emails are auto-cleared after one year. Your Gmail is never touched.
