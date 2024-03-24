import { useEffect, useState } from "react"

const useOnline = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
    }
    const handleOffline = () => {
      setIsOnline(false)
    }
    // After cleaning the code so that we can easily use "removeEventListener"
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Removing 'eventListener' from cache after use like moving from body to about component
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

export default useOnline
