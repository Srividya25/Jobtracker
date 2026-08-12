import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Visible fallback in case React fails to mount
document.getElementById('root')!.innerHTML = `
  <style>
    @keyframes jtspin { to { transform: rotate(360deg); } }
  </style>
  <div style="padding: 48px; font-family: system-ui; display: flex; flex-direction: column; align-items: center; gap: 12px; color: #64748b;">
    <div style="width: 26px; height: 26px; border-radius: 50%; border: 3px solid #e2e8f0; border-top-color: #a06a3c; animation: jtspin 0.7s linear infinite;"></div>
    <p style="margin: 0; font-size: 13px;">Loading JobTracker…</p>
  </div>
`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)