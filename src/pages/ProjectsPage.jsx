import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Github } from 'lucide-react'
import { fetchAPI } from '../utils/api'
import '../styles/ProjectsPage.css'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchAPI('/projects')
        console.log('Loaded projects:', data)
        if (Array.isArray(data)) {
          setProjects(data)
        } else {
          setProjects([])
          setError('Invalid data format')
        }
      } catch (err) {
        console.error('Failed to load projects:', err)
        setError('Failed to load projects')
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

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

      {loading && (
        <div className="loading">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          ></motion.div>
        </div>
      )}

      {error && !loading && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {!loading && projects.length === 0 && !error && (
        <div className="no-projects">
          <p>No projects yet. Check back soon!</p>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-wrapper">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="project-image"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
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

                {(project.languages || project.frameworks || project.category) && (
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
                )}

                {project.githublink && (
                  <a
                    href={project.githublink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    <Github size={16} style={{ marginRight: '0.5rem' }} />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
