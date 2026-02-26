const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function fetchAPI(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`)
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`)
  return response.json()
}

export async function postAPI(endpoint, data) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': import.meta.env.VITE_ADMIN_KEY || ''
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`)
  return response.json()
}

export async function postFormAPI(endpoint, formData) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'x-admin-key': import.meta.env.VITE_ADMIN_KEY || ''
    },
    body: formData
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `API Error: ${response.statusText}`)
  }
  return response.json()
}
