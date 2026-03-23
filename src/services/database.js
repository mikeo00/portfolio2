import { supabase } from '../supabaseClient'

// Languages
export const languageService = {
  async find() {
    const { data, error } = await supabase.from('languages').select('*')
    if (error) throw error
    return data
  },

  async findById(id) {
    const { data, error } = await supabase.from('languages').select('*').eq('id', id).single()
    if (error) throw error
    return data
  },

  async create(language) {
    const { data, error } = await supabase.from('languages').insert(language).select().single()
    if (error) throw error
    return data
  },

  async update(id, language) {
    const { data, error } = await supabase.from('languages').update(language).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { data, error } = await supabase.from('languages').delete().eq('id', id).select().single()
    if (error) throw error
    return data
  }
}

// Frameworks
export const frameworkService = {
  async find() {
    const { data, error } = await supabase.from('frameworks').select('*')
    if (error) throw error
    return data
  },

  async findById(id) {
    const { data, error } = await supabase.from('frameworks').select('*').eq('id', id).single()
    if (error) throw error
    return data
  },

  async create(framework) {
    const { data, error } = await supabase.from('frameworks').insert(framework).select().single()
    if (error) throw error
    return data
  },

  async update(id, framework) {
    const { data, error } = await supabase.from('frameworks').update(framework).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { data, error } = await supabase.from('frameworks').delete().eq('id', id).select().single()
    if (error) throw error
    return data
  }
}

// Projects
export const projectService = {
  async find() {
    const { data, error } = await supabase.from('projects').select('*')
    if (error) throw error
    return data
  },

  async findById(id) {
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
    if (error) throw error
    return data
  },

  async create(project) {
    const { data, error } = await supabase.from('projects').insert(project).select().single()
    if (error) throw error
    return data
  },

  async update(id, project) {
    const { data, error } = await supabase.from('projects').update(project).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { data, error } = await supabase.from('projects').delete().eq('id', id).select().single()
    if (error) throw error
    return data
  }
}
