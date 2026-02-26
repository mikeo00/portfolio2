const API_URL = import.meta.env.VITE_API_URL || ''

export async function fetchAPI(endpoint) {
  const url = API_URL ? `${API_URL}${endpoint}` : endpoint
  const response = await fetch(url)
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`)
  return response.json()
}

export async function postAPI(endpoint, data) {
  const url = API_URL ? `${API_URL}${endpoint}` : endpoint
  const response = await fetch(url, {
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
  const url = API_URL ? `${API_URL}${endpoint}` : endpoint
  const response = await fetch(url, {
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
