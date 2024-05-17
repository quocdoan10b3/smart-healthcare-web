import { saveLogout } from '@/redux-toolkit/auth.slice'
import { postLogout } from '@/services/AuthService/authService'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ButtonLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    const tokenLocal = localStorage.getItem('refreshToken')
    console.log('refreshToken:', tokenLocal)
    if (tokenLocal !== null) {
      const refreshToken = JSON.parse(tokenLocal)
      try {
        console.log(refreshToken)
        await postLogout(refreshToken)
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 2000))
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang đăng xuất ⌛',
            success: 'Đăng xuất thành công !'
          })
          .then(() => {
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            dispatch(saveLogout())
            navigate('/')
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
  return (
    <div>
      <Button
        onClick={handleLogout}
        variant='text'
        sx={{
          width: '100%',
          height: '40px',
          color: '#46e060'
        }}
      >
        Đăng xuất
      </Button>
    </div>
  )
}

export default ButtonLogout
