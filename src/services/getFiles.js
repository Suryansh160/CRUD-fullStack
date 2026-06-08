import axios from 'axios'

const uploadFile = async file => {
  const token = localStorage.getItem('token')

  console.log('Token:', token)
  console.log('Uploading file:', file.name)

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(
      'https://auth-fileupload.onrender.com/api/upload',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    console.log('Upload successful:', response.data)
    return response.data
  } catch (e) {
    console.error('Upload error:', e.response?.status, e.response?.data || e.message)
    throw e
  }
}

const getAllFiles = async () => {
  const token = localStorage.getItem('token')

  try {
    const response = await axios.get('https://auth-fileupload.onrender.com/api/get', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (e) {
    console.log('Error fetching files:', e)
    throw e
  }
}

const handleDelete = async id => {
  const token = localStorage.getItem('token')

  try {
    const response = await axios.delete(`https://auth-fileupload.onrender.com/api/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (e) {
    console.log('Error fetching files:', e)
    throw e
  }
}

export { uploadFile, getAllFiles, handleDelete }
