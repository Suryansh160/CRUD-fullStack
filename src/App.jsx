import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import { isTokenValid } from './utilities/auth-util'
import { FileProvider } from './context/FileContext'

const PrivateRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to='/login' />
}

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='' element={<Register />} />

        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <FileProvider>
                <Dashboard />
              </FileProvider>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
