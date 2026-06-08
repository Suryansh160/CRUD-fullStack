import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { uploadFile } from '../services/getFiles'
import { useFiles } from '../context/FileContext'

function UploadButton ({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const { refetch } = useFiles()

  const handleUpload = async e => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploading(true)
      const data = await uploadFile(file)
      console.log('Uploaded:', data)
      refetch()
    } catch (err) {
      console.log(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleUpload}
        className='hidden'
      />

      <Button onClick={() => fileInputRef.current.click()} disabled={uploading}>
        {uploading ? 'Uploading...' : '+ Upload File'}
      </Button>
    </>
  )
}

export default UploadButton
