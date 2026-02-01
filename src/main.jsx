import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Backend from './Backend.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Backend/>
  </StrictMode>,
)
