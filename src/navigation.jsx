import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from './context/AuthContext'
import './styles/Navigation.css'

export default function Navigation({ onAdminClick, user }) {
  const { logout } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/">
            <span className="logo-text">Portfolio</span>
          </Link>
        </motion.div>

        <button
          className="mobile-menu-icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <motion.ul
          className={`nav-menu ${isOpen ? 'active' : ''}`}
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.li variants={itemVariants}>
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link to="/projects" className="nav-link" onClick={() => setIsOpen(false)}>
              Projects
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link to="/skills" className="nav-link" onClick={() => setIsOpen(false)}>
              Skills
            </Link>
          </motion.li>

          <motion.li variants={itemVariants}>
            <button
              className="admin-btn"
              onClick={() => {
                onAdminClick()
                setIsOpen(false)
              }}
            >
              {user ? '⚙️ Admin' : 'Admin'}
            </button>
          </motion.li>

          {user && (
            <motion.li variants={itemVariants}>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </motion.li>
          )}
        </motion.ul>
      </div>
    </motion.nav>
  )
}