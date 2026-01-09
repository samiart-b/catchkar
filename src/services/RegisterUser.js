import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true,
})

/**
 * Registers a new user.
 *
 * NOTE: Adjust the endpoint to match your Django backend.
 * Common options: /api/auth/register/, /users/, /accounts/register/
 */
export async function RegisterUser({ email, password }) {
  const { data } = await api.post('/api/register/', { email, password })
  return data
}
