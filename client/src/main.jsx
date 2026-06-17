// client/src/main.jsx — App bootstrap
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'

// Apply persisted theme before React hydrates to prevent FOUC
const savedTheme = localStorage.getItem('eco-theme') || 'eco'
document.documentElement.setAttribute('data-theme', savedTheme)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
