import { jwtDecode } from 'jwt-decode'
import UploadButton from '../components/uploadButton'
import Content from '../components/content'
import { Card } from '../components/ui/card'
import LogoutButton from '../components/logoutButton'

function Dashboard () {
  const token = localStorage.getItem('token')
  const { username } = jwtDecode(token)

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Hi, {username} </h1>
        <UploadButton />
      </div>

      <Card>
        <Content />
      </Card>
              <LogoutButton />

    </div>
  )
}

export default Dashboard
