import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { logout } from '../utilities/auth-util'
import { LogOut } from 'lucide-react'

function LogoutButton () {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className='fixed bottom-6 right-6'>
      <Button
        variant='ghost'
        onClick={handleLogout}
        className='text-red-400 hover:text-red-500 hover:bg-red-400/10'
      >
        <LogOut className='w-4 h-4 mr-2' />
        Logout
      </Button>
    </div>
  )
}

export default LogoutButton