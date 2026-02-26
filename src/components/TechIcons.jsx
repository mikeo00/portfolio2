export function JavascriptIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
      <rect width="100" height="100" fill="#f7df1e" rx="10"/>
      <text x="50" y="70" fontSize="60" fontWeight="bold" fill="#000" textAnchor="middle" fontFamily="Arial">JS</text>
    </svg>
  )
}

export function ReactIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#61dafb" strokeWidth="3"/>
      <circle cx="30" cy="50" r="3" fill="#61dafb"/>
      <circle cx="70" cy="50" r="3" fill="#61dafb"/>
      <circle cx="50" cy="35" r="3" fill="#61dafb"/>
      <ellipse cx="50" cy="50" rx="20" ry="10" fill="none" stroke="#61dafb" strokeWidth="2"/>
      <ellipse cx="50" cy="50" rx="20" ry="10" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(60 50 50)"/>
      <ellipse cx="50" cy="50" rx="20" ry="10" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(120 50 50)"/>
      <circle cx="50" cy="50" r="5" fill="#61dafb"/>
    </svg>
  )
}

export function PythonIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
      <defs>
        <linearGradient id="pythonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3773a7"/>
          <stop offset="100%" stopColor="#ffe052"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#pythonGrad)"/>
      <text x="50" y="65" fontSize="45" fontWeight="bold" fill="#fff" textAnchor="middle" fontFamily="Arial">Py</text>
    </svg>
  )
}

export function TypescriptIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
      <rect width="100" height="100" fill="#3178c6" rx="10"/>
      <text x="50" y="65" fontSize="50" fontWeight="bold" fill="#fff" textAnchor="middle" fontFamily="Arial">TS</text>
    </svg>
  )
}

export function JavaIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
      <circle cx="50" cy="50" r="45" fill="#007396"/>
      <text x="50" y="70" fontSize="55" fontWeight="bold" fill="#fff" textAnchor="middle" fontFamily="Arial">☕</text>
    </svg>
  )
}

export function NodeIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
      <circle cx="50" cy="50" r="45" fill="#68a063"/>
      <text x="50" y="65" fontSize="40" fontWeight="bold" fill="#fff" textAnchor="middle" fontFamily="Arial">Node</text>
    </svg>
  )
}

export function VueIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
      <path d="M 50 15 L 90 85 L 50 70 L 10 85 Z" fill="#41b883"/>
      <path d="M 50 15 L 50 70 L 10 85 Z" fill="#34495e"/>
    </svg>
  )
}

export function VitestIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
      <rect width="100" height="100" fill="#6e9cff" rx="10"/>
      <text x="50" y="55" fontSize="25" fontWeight="bold" fill="#fff" textAnchor="middle" fontFamily="Arial">⚡</text>
      <text x="50" y="75" fontSize="16" fontWeight="bold" fill="#fff" textAnchor="middle" fontFamily="Arial">Vite</text>
    </svg>
  )
}

export function ExpressIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
      <circle cx="50" cy="50" r="45" fill="#000"/>
      <text x="50" y="65" fontSize="35" fontWeight="bold" fill="#fff" textAnchor="middle" fontFamily="Arial">Ex</text>
    </svg>
  )
}

export function DefaultTechIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
      <circle cx="50" cy="50" r="45" fill="#00d4ff" opacity="0.2" stroke="#00d4ff" strokeWidth="2"/>
      <circle cx="50" cy="50" r="8" fill="#00d4ff"/>
      <circle cx="30" cy="50" r="6" fill="#00d4ff"/>
      <circle cx="70" cy="50" r="6" fill="#00d4ff"/>
    </svg>
  )
}

export function getTechIcon(techName) {
  const name = (techName || '').toLowerCase().trim()

  const iconMap = {
    'javascript': JavascriptIcon,
    'react': ReactIcon,
    'python': PythonIcon,
    'typescript': TypescriptIcon,
    'java': JavaIcon,
    'node': NodeIcon,
    'nodejs': NodeIcon,
    'vue': VueIcon,
    'vuejs': VueIcon,
    'vite': VitestIcon,
    'vitest': VitestIcon,
    'express': ExpressIcon,
  }

  for (const [key, IconComponent] of Object.entries(iconMap)) {
    if (name.includes(key)) {
      return IconComponent
    }
  }

  return DefaultTechIcon
}
