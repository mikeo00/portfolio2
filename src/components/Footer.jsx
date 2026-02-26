import { motion } from 'framer-motion'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const linkVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.footer
      className="footer"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-100px' }}
    >
      <div className="footer-content">
        <motion.div className="footer-section" variants={itemVariants}>
          <p className="footer-text">Let's connect and create something amazing</p>
        </motion.div>

        <motion.div
          className="footer-links"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <motion.a
            href="https://github.com/mikeo00"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link github-link"
            variants={linkVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="link-icon">💻</span>
            <span className="link-text">GitHub</span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/michael-osta-861885257/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link linkedin-link"
            variants={linkVariants}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="link-icon">🔗</span>
            <span className="link-text">LinkedIn</span>
          </motion.a>
        </motion.div>

        <motion.div className="footer-section" variants={itemVariants}>
          <p className="footer-copyright">© 2024 Michael Osta. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
