import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '@/store'
const GuestRoute = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const role = useSelector((state: RootState) => state.auth.role)
  console.log(user)
  if (user && role == 'admin') {
    return <Navigate to='/admin' />
  }
  if (user && role == 'student') {
    return <Navigate to='/student' />
  }
  if (user && role == 'staff') {
    return <Navigate to='/staff' />
  }
  return <Outlet />
}

export default GuestRoute
