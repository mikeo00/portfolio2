import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getTechIcon } from '../components/TechIcons'
import '../styles/SkillsPage.css'

export default function SkillsPage() {
  const [languages, setLanguages] = useState([])
  const [frameworks, setFrameworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [langsRes, framesRes] = await Promise.all([
          fetch('http://localhost:4000/languages'),
          fetch('http://localhost:4000/frameworks')
        ])

        const langsData = await langsRes.json()
        const framesData = await framesRes.json()

        console.log('Languages data:', langsData)
        console.log('Frameworks data:', framesData)

        setLanguages(langsData)
        setFrameworks(framesData)
      } catch (error) {
        console.error('Error fetching skills:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleImageError = (id) => {
    console.error(`Image failed to load: ${id}`)
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="skills-page">
      <motion.section
        className="skills-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>My Skills & Technologies</h1>
        <p>A comprehensive overview of my technical expertise</p>
      </motion.section>

      {loading ? (
        <motion.div
          className="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        </motion.div>
      ) : (
        <>
          <motion.section
            className="skills-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="section-header"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <h2>Programming Languages</h2>
              <div className="section-divider"></div>
            </motion.div>

            <motion.div
              className="skills-grid"
              variants={containerVariants}
            >
              {languages.map((lang, index) => {
                const IconComponent = getTechIcon(lang.title)
                return (
                  <motion.div
                    key={lang.id}
                    className="skill-card language-card"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.08,
                      rotateY: 10,
                      boxShadow: '0 20px 50px rgba(0, 212, 255, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="skill-icon-wrapper"
                      animate={{
                        y: [0, -10, 0],
                        rotateZ: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.1
                      }}
                    >
                      {lang.logo_url && !imageErrors[`lang-${lang.id}`] ? (
                        <img
                          src={lang.logo_url}
                          alt={lang.title}
                          className="skill-icon"
                          onError={() => handleImageError(`lang-${lang.id}`)}
                        />
                      ) : (
                        <IconComponent />
                      )}
                    </motion.div>
                    <h3>{lang.title}</h3>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        transition={{ duration: 1.2, delay: index * 0.05 }}
                        viewport={{ once: false }}
                      ></motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.section>

          <motion.section
            className="skills-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
          >
            <motion.div
              className="section-header"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <h2>Frameworks & Tools</h2>
              <div className="section-divider"></div>
            </motion.div>

            <motion.div
              className="skills-grid"
              variants={containerVariants}
            >
              {frameworks.map((frame, index) => {
                const IconComponent = getTechIcon(frame.title)
                return (
                  <motion.div
                    key={frame.id}
                    className="skill-card framework-card"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.08,
                      rotateY: 10,
                      boxShadow: '0 20px 50px rgba(255, 0, 110, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="skill-icon-wrapper"
                      animate={{
                        y: [0, -10, 0],
                        rotateZ: [0, -5, 5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.1
                      }}
                    >
                      {frame.logo_url && !imageErrors[`frame-${frame.id}`] ? (
                        <img
                          src={frame.logo_url}
                          alt={frame.title}
                          className="skill-icon"
                          onError={() => handleImageError(`frame-${frame.id}`)}
                        />
                      ) : (
                        <IconComponent />
                      )}
                    </motion.div>
                    <h3>{frame.title}</h3>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: '80%' }}
                        transition={{ duration: 1.2, delay: index * 0.05 }}
                        viewport={{ once: false }}
                      ></motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.section>
        </>
      )}
    </div>
  )
}
