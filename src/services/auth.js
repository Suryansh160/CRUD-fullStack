import axios from 'axios'

const loginUser = async userData => {
  try {
    const response = await axios.post(
      'https://auth-fileupload.onrender.com/api/auth/login',
      userData,
      {
        withCredentials: true
      }
    )

    return response.data
  } catch (error) {
    console.log('Error Data:', error.response?.data)
    throw error
  }
}

export default loginUser
