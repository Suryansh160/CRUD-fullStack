import { createContext, useContext, useState, useCallback } from 'react'

const FileContext = createContext()

export function FileProvider ({ children }) {
  const [refreshKey, setRefreshKey] = useState(0)

  const refetch = useCallback(() => {
    setRefreshKey(prev => prev + 1)
  }, [])

  return (
    <FileContext.Provider value={{ refreshKey, refetch }}>
      {children}
    </FileContext.Provider>
  )
}

export const useFiles = () => useContext(FileContext)
