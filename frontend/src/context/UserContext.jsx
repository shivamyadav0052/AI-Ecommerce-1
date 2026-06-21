import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const userDataContext = createContext()

function UserContext({ children }) {
  let [userData, setUserData] = useState("")
  let { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()
  const sessionHandledRef = useRef(false)

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/getcurrentuser", { withCredentials: true })
      setUserData(result.data)
    } catch (error) {
      setUserData(null)
    }
  }

  const handleUnauthorizedSession = () => {
    if (sessionHandledRef.current) return

    sessionHandledRef.current = true
    setUserData(null)
    window.dispatchEvent(new Event('onecart:session-expired'))
    toast.error('Session expired. Please login again.')
    navigate('/login')

    setTimeout(() => {
      sessionHandledRef.current = false
    }, 1000)
  }

  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status
        const requestUrl = error?.config?.url || ''

        const isProtectedCall =
          requestUrl.includes('/api/cart/') ||
          requestUrl.includes('/api/order/') ||
          requestUrl.includes('/api/user/getcurrentuser')

        if (isProtectedCall && (status === 401 || status === 404)) {
          const isInitialUserFetch = requestUrl.includes('/api/user/getcurrentuser')
          setUserData(null)

          if (!isInitialUserFetch) {
            handleUnauthorizedSession()
          }
        }

        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  useEffect(() => {
    getCurrentUser()
  }, [])

  let value = {
    userData, setUserData, getCurrentUser
  }

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
