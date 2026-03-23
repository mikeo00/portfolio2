import { languageService, frameworkService, projectService } from '../services/database'
import { storageService } from '../services/storage'

// Fetch languages
export async function fetchAPI(endpoint) {
  if (endpoint === '/languages') {
    const languages = await languageService.find()
    return languages.map(l => ({
      ...l,
      logo_url: storageService.getPublicUrl('language_logos', l.logo)
    }))
  }

  if (endpoint === '/frameworks') {
    const frameworks = await frameworkService.find()
    return frameworks.map(f => ({
      ...f,
      logo_url: storageService.getPublicUrl('framework_logos', f.logo)
    }))
  }

  if (endpoint === '/projects') {
    const projects = await projectService.find()
    return projects.map(p => ({
      ...p,
      image_url: storageService.getPublicUrl('images', p.image)
    }))
  }

  throw new Error(`Unknown endpoint: ${endpoint}`)
}

// Create new language
export async function postAPI(endpoint, data) {
  if (endpoint === '/languages') {
    const language = await languageService.create(data)
    return {
      message: 'language created successfully',
      language
    }
  }

  if (endpoint === '/frameworks') {
    const framework = await frameworkService.create(data)
    return {
      message: 'framework created successfully',
      framework
    }
  }

  if (endpoint === '/projects') {
    const project = await projectService.create(data)
    return {
      message: 'project created successfully',
      project
    }
  }

  throw new Error(`Unknown endpoint: ${endpoint}`)
}

// Handle file uploads for admin
export async function postFormAPI(endpoint, formData) {
  const title = formData.get('title')
  const file = formData.get('file')

  if (!title) throw new Error('title is required')
  if (!file) throw new Error('file is required')

  try {
    if (endpoint === '/languages') {
      const uploaded = await storageService.uploadLanguageLogo(file)
      const language = await languageService.create({
        title,
        logo: uploaded.path
      })
      return { message: 'language created successfully', language }
    }

    if (endpoint === '/frameworks') {
      const uploaded = await storageService.uploadFrameworkLogo(file)
      const framework = await frameworkService.create({
        title,
        logo: uploaded.path
      })
      return { message: 'framework created successfully', framework }
    }

    if (endpoint === '/projects') {
      const description = formData.get('description')
      const category = formData.get('category')
      const githublink = formData.get('githublink')
      const languages = formData.get('languages')
      const frameworks = formData.get('frameworks')

      if (!description || !category || !githublink || !languages || !frameworks) {
        throw new Error('an attribute is missing')
      }

      const uploaded = await storageService.uploadProjectImage(file)
      const project = await projectService.create({
        title,
        description,
        image: uploaded.path,
        category,
        githublink,
        languages,
        frameworks
      })
      return { message: 'project created successfully', project }
    }

    throw new Error(`Unknown endpoint: ${endpoint}`)
  } catch (error) {
    throw new Error(error.error || error.message)
  }
}
