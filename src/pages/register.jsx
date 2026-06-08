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
import { useNavigate, Link } from 'react-router-dom'
import { isTokenValid } from '../utilities/auth-util'
import axios from 'axios'

function Register () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isTokenValid()) navigate('/dashboard')
  }, [])

  const handleRegister = async () => {
    try {
      setError('')
      await axios.post('https://auth-fileupload.onrender.com/api/auth/register', {
        username,
        email,
        password
      })
      navigate('/login')
    } catch (e) {
      setError(e.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <Card className='w-[400px] shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl'>Create Account</CardTitle>
          <CardDescription>
            Already have an account?{' '}
            <Link to='/login' className='text-black font-medium underline'>
              Login
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
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <Button className='w-full' onClick={handleRegister}>
            Create Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register