import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '@/store'
const GuestRoute = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  console.log(user)
  if (user) {
    return <Navigate to='/' />
  }
  return <Outlet />
}

export default GuestRoute
