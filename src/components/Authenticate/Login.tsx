import { LoginSchema, initialValues } from '@/helpers/LoginValidate'
import { postLogin } from '@/services/AuthService/authService'
import { LoginData } from '@/shared/types'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { saveUserLogin } from '@/redux-toolkit/auth.slice'
import Logo from '@/assets/images/logo.jpg'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const handleFormSubmit = async (values: LoginData) => {
    const dataLogin = {
      identifier: values.username,
      password: values.password
    }
    try {
      const response = await postLogin(dataLogin)
      console.log(response)

      if (response.status === 200) {
        const { user, accessToken, refreshToken, role } = response.data
        dispatch(saveUserLogin({ user, accessToken, refreshToken, role }))
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 100))
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang tiến hành đăng nhập ⌛',
            success: 'Đăng nhập thành công !'
          })
          .then(() => {
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
            localStorage.setItem('role', JSON.stringify(role))
            if (role === 'admin') navigate('/admin')
            if (role === 'student') navigate('/student')
            if (role === 'staff') navigate('/staff')
          })
      }
    } catch (error) {
      const rejectAfter2Sec = new Promise((_, reject) => setTimeout(reject, 2000))
      toast.promise(rejectAfter2Sec, {
        pending: 'Đang tiến hành đăng nhập ⌛',
        error: 'Tài khoản hoặc mật khẩu không chính xác !'
      })
      throw error
    }
  }

  return (
    <div
      className='flex justify-center min-h-screen'
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='bg-gradient-to-r from-green-300 to-orange-300 w-1/3 h-2/3 m-auto rounded-xl'>
        <div className='text-center'>
          <div className='flex justify-center mt-10'>
            <img src={Logo} alt='logo' style={{ width: '30%', height: '30%' }} />
          </div>
          <h2 className='mt-5 text-blue-800 font-bold' style={{ fontSize: '21px', lineHeight: '30px' }}>
            HỆ THỐNG QUẢN LÝ Y TẾ HỌC ĐƯỜNG
          </h2>
        </div>
        <div className='mx-auto w-full max-w-[400px]'>
          <div className='mx-auto max-w-[400px] text-center mb-4 mt-7'>
            <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={LoginSchema}>
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} name='form-login' method='post'>
                  <div className='relative'>
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `95%`,
                        marginBottom: '20px'
                      }}
                      id='username'
                      label='Tên đăng nhập'
                      variant='standard'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                    />
                  </div>
                  <div className='relative'>
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `95%`,
                        marginBottom: '20px'
                      }}
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      label='Mật khẩu'
                      variant='standard'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: '0',
                        top: '10px',
                        marginRight: 1
                      }}
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>
                  <div className='flex justify-end mb-7'>
                    <Link to='/forgot-password'>Quên mật khẩu?</Link>
                  </div>
                  <div className='flex justify-center'>
                    <Button
                      sx={{
                        width: '95%',
                        height: '50px',
                        backgroundColor: '#003300'
                      }}
                      variant='contained'
                      size='large'
                      type='submit'
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
