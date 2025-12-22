import axios from 'axios'
import { useEffect } from 'react'
import { auth } from '../Firebase/firebase.init'

const axiosSecure = axios.create({
  baseURL: 'https://reportify-server.vercel.app',
})

const useAxiosSecure = () => {

  useEffect(() => {

    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser
        if (user) {
          const token = await user.getIdToken(true)
          config.headers.authorization = `Bearer ${token}`
        }
        return config
      }
    )

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        // error forward
        return Promise.reject(error)
      }
    )

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor)
      axiosSecure.interceptors.response.eject(responseInterceptor)
    }

  }, [])

  return axiosSecure
}

export default useAxiosSecure
