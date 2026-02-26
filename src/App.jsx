import { useState, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import Navigation from './navigation.jsx'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import Backend from './Backend'
import Login from './components/Login'
import { AuthContext, AuthProvider } from './context/AuthContext'

function AppContent() {
  const { user } = useContext(AuthContext)
  const [showAdmin, setShowAdmin] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const handleAdminClick = () => {
    if (user) {
      setShowAdmin(!showAdmin)
    } else {
      setShowLogin(true)
    }
  }

  return (
    <Router>
      <div className="main-app">
        <Navigation onAdminClick={handleAdminClick} user={user} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Routes>

        <AnimatePresence>
          {showAdmin && user && (
            <motion.div
              key="admin-modal"
              className="admin-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowAdmin(false)}
            >
              <motion.div
                className="admin-modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-admin-btn"
                  onClick={() => setShowAdmin(false)}
                >
                  ✕
                </button>
                <Backend />
              </motion.div>
            </motion.div>
          )}

          {showLogin && (
            <Login onClose={() => setShowLogin(false)} />
          )}
        </AnimatePresence>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
