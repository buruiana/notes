import { loginSelectors } from '@just4dev/services'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = (navigate) => {
  const authenticated = useSelector(loginSelectors.loginSelector)
  useEffect(() => {
    if (!authenticated) {
      navigate('/login')
    }
  }, [authenticated])
}
