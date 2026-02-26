import { motion } from 'framer-motion'
import { Palette, Zap, Rocket, Sparkles } from 'lucide-react'
import '../styles/HomePage.css'

export default function HomePage() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    }
  }

  const floatingBoxVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, type: "spring", stiffness: 100 }
    },
    animate: {
      y: [0, -40, 0],
      x: [0, 20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="hero-title"
            variants={titleVariants}
          >
            <span className="title-gradient">Michael Osta</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            I'm a 3rd year computer science student looking forward to become a software and AI engineer, also passionate about web development.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.a
              href="/projects"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="/skills"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 0, 110, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Skills
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-orb"
              variants={floatingBoxVariants}
              animate="animate"
              style={{
                animationDelay: `${i * 0.2}s`
              }}
            ></motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section
        className="features-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, margin: '-100px' }}
      >
        <h2>What I Offer</h2>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
        >
          {[
            {
              title: 'Responsive Design',
              description: 'Beautiful interfaces that work seamlessly on all devices',
              icon: Palette
            },
            {
              title: 'Performance',
              description: 'Lightning-fast applications optimized for user experience',
              icon: Zap
            },
            {
              title: 'Modern Stack',
              description: 'Built with the latest technologies and best practices',
              icon: Rocket
            },
            {
              title: 'Interactive',
              description: 'Engaging animations and smooth user interactions',
              icon: Sparkles
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: '0 30px 60px rgba(0, 212, 255, 0.2)'
              }}
            >
              <feature.icon className="feature-icon" size={32} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="cta-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <h2>Let's Create Something Amazing</h2>
        <motion.a
          href="/projects"
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Exploring
        </motion.a>
      </motion.section>
    </div>
  )
}
