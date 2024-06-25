import { Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
const ForgotPasswordSchema = Yup.object().shape({
  username: Yup.string().required('Tên đăng nhập là bắt buộc'),
  fullName: Yup.string().required('Họ tên là bắt buộc'),
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc')
})

const initialValues = {
  username: '',
  fullName: '',
  email: ''
}

const ForgotPassword = () => {
  const navigate = useNavigate()

  const handleFormSubmit = async (values: { username: string; fullName: string; email: string }) => {
    try {
      console.log('Submitted values:', values)
      toast.success('Yêu cầu đặt lại mật khẩu đã được gửi thành công!')
      navigate('/')
    } catch (error) {
      //   toast.error('Có lỗi xảy ra, vui lòng thử lại!')
      toast.error('Tài khoản, họ tên, email không trùng khớp khi đăng kí!')
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
          <h2 className='mt-5 text-blue-800 font-bold' style={{ fontSize: '21px', lineHeight: '30px' }}>
            Đặt lại mật khẩu
          </h2>
        </div>
        <div className='mx-auto w-full max-w-[400px]'>
          <div className='mx-auto max-w-[400px] text-center mb-4 mt-7'>
            <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={ForgotPasswordSchema}>
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} name='form-forgot-password' method='post'>
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
                      id='fullName'
                      label='Họ tên'
                      variant='standard'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullName}
                      error={!!touched.fullName && !!errors.fullName}
                      helperText={touched.fullName && errors.fullName}
                    />
                  </div>
                  <div className='relative'>
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `95%`,
                        marginBottom: '20px'
                      }}
                      id='email'
                      label='Email'
                      variant='standard'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
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
                      Gửi yêu cầu
                    </Button>
                  </div>
                  <div className='flex justify-center mt-4'>
                    <Link to='/'>Quay lại đăng nhập</Link>
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

export default ForgotPassword
