import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import { fetchAPI } from '../utils/api'
import '../styles/ProjectsPage.css'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects from /projects...')
        const data = await fetchAPI('/projects')
        console.log('Projects data:', data)
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="projects-page">
      <motion.section
        className="projects-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>My Projects</h1>
        <p>Explore my latest work and achievements</p>
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
      ) : !Array.isArray(projects) || projects.length === 0 ? (
        <motion.div
          className="no-projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>No projects yet. Check back soon!</p>
        </motion.div>
      ) : (
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="project-image-wrapper">
                {project.image_url && !imageErrors[`proj-${project.id}`] ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="project-image"
                    onError={() => handleImageError(`proj-${project.id}`)}
                  />
                ) : (
                  <div className="project-image-fallback">
                    <Package size={64} />
                  </div>
                )}
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-meta">
                  {project.languages && (
                    <div className="meta-item">
                      <span className="meta-label">Languages:</span>
                      <span>{project.languages}</span>
                    </div>
                  )}
                  {project.frameworks && (
                    <div className="meta-item">
                      <span className="meta-label">Frameworks:</span>
                      <span>{project.frameworks}</span>
                    </div>
                  )}
                  {project.category && (
                    <div className="meta-item">
                      <span className="meta-label">Category:</span>
                      <span>{project.category}</span>
                    </div>
                  )}
                </div>

                {project.githublink && (
                  <motion.a
                    href={project.githublink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View on GitHub →
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
