import { supabase } from '../supabaseClient'

function safeName(name = 'file') {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-')
}

export const storageService = {
  // Upload project image
  async uploadProjectImage(file) {
    const path = `projects/${Date.now()}-${safeName(file.name)}`
    const { data, error } = await supabase.storage
      .from('images')
      .upload(path, file, { upsert: true })

    if (error) throw error
    return data
  },

  // Upload language logo
  async uploadLanguageLogo(file) {
    const filePath = `languages/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const { data, error } = await supabase.storage
      .from('language_logos')
      .upload(filePath, file, { upsert: true })

    if (error) throw error
    return data
  },

  // Upload framework logo
  async uploadFrameworkLogo(file) {
    const path = `frameworks/${Date.now()}-${safeName(file.name)}`
    const { data, error } = await supabase.storage
      .from('framework_logos')
      .upload(path, file, { upsert: true })

    if (error) throw error
    return data
  },

  // Get public URL for uploaded files
  getPublicUrl(bucket, path) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  },

  // Create signed URL for private files
  async createSignedUrl(bucket, path, expiresInSeconds = 60 * 60) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresInSeconds)

    if (error) throw error
    return data.signedUrl
  },

  // List files in bucket/folder
  async list(bucket, folder = '', limit = 100, offset = 0) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, { limit, offset, sortBy: { column: 'created_at', order: 'desc' } })

    if (error) throw error
    return data
  },

  // Remove files
  async remove(bucket, pathsArray) {
    const { data, error } = await supabase.storage.from(bucket).remove(pathsArray)
    if (error) throw error
    return data
  }
}
