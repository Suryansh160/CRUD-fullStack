import { useState, useEffect } from 'react'
import { getAllFiles, handleDelete } from '../services/getFiles'
import { Card, CardContent } from './ui/card'
import { FileText, ImageIcon, Film, File, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { useFiles } from '../context/FileContext'

const getFileIcon = filename => {
  const ext = filename?.split('.').pop().toLowerCase()
  if (['jpg', 'jpeg', 'png'].includes(ext))
    return <ImageIcon className='w-6 h-6 text-blue-400' />
  if (['mp4'].includes(ext)) return <Film className='w-6 h-6 text-purple-400' />
  if (['pdf'].includes(ext))
    return <FileText className='w-6 h-6 text-red-400' />
  return <File className='w-6 h-6 text-zinc-400' />
}

const openFile = file => {
  window.open(file.url)
}

function Content () {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const { refreshKey, refetch } = useFiles()

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true)
        const data = await getAllFiles()
        setFiles(data.files)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetchFiles()
  }, [refreshKey])

  const handleDeleteLocal = async id => {
    try {
      await handleDelete(id)
      refetch()
    } catch (e) {
      console.log(e)
    }
  }

  if (loading) return <p className='text-zinc-400'>Loading files...</p>
  if (files.length === 0) return <p className='text-zinc-400'>No files yet</p>

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {files.map(file => (
        <Card
          key={file._id}
          className='bg-zinc-900 border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer'
          onClick={() => openFile(file)}
        >
          <CardContent className='p-4 flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              {getFileIcon(file.fileName)}
              <p className='text-white text-sm font-medium truncate flex-1'>
                {file.fileName}
              </p>
              <Button
                variant='ghost'
                size='sm'
                onClick={e => {
                  e.stopPropagation()
                  handleDeleteLocal(file._id)
                }}
                className='text-zinc-500 hover:text-red-400 hover:bg-red-400/10'
              >
                <Trash2 className='w-4 h-4 mr-1' />
                Delete
              </Button>
            </div>
            <p className='text-zinc-500 text-xs'>
              {new Date(file.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Content
