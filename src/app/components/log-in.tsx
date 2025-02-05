import * as React from 'react'
import { useStore } from '../store/useStore'
import { axiosInstance } from '../api/axiosInstance'
import { apiUsers } from '../api/path'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

const LogIn = () => {
  const [  , setLoading] = React.useState(false)
  const setProfile = useStore((state) => state.setProfile)

  const logIn = async () => {
    const id = Math.floor(Math.random() * 10) + 1
    try {
      setLoading(true)
      const response = await axiosInstance.get(`${apiUsers}/${id}`)
      const profile = response.data
      localStorage.setItem('profile', JSON.stringify(profile))
      setProfile(profile)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const notify = () => toast.success('Successfully Logged In !')

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      logIn()
      notify()
    }, 1000)
  }

  return (
      <Button onClick={handleClick}>
        Log In
      </Button>
  )
}

export default LogIn