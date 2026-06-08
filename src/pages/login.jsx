import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import loginUser from '../services/auth'
import { useNavigate, Link } from 'react-router-dom'
import { isTokenValid } from '../utilities/auth-util'

function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isTokenValid()) navigate('/dashboard')
  }, [])

  const handleLogin = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await loginUser({ username, password })
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <Card className='w-[400px] shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Don't have an account?{' '}
            <Link to='/register' className='text-black font-medium underline'>
              Register
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <Input
            type='text'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <Button className='w-full' onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
