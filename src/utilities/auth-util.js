import { jwtDecode } from 'jwt-decode'

export const isTokenValid = () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    const isExpired = decoded.exp * 1000 < Date.now()
    if (isExpired) {
      localStorage.removeItem('token')
      return false
    }
    return true
  } catch (err) {
    localStorage.removeItem('token')
    return false
  }
}

export const logout = () => {
  localStorage.removeItem('token')
}
