import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Visible fallback in case React fails to mount
document.getElementById('root')!.innerHTML = `
  <div style="padding: 20px; font-family: system-ui;">
    <h1>JobTracker</h1>
    <p>Loading application…</p>
  </div>
`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)