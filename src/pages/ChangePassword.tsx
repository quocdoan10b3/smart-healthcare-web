import { useState } from 'react'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import { changePasswordApi } from '@/services/AuthService/authService'
import { toast } from 'react-toastify'
import { ChangePasswordType } from '@/@types/user'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [oldPasswordError, setOldPasswordError] = useState('')

  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).+$/

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // if (newPassword === oldPassword) {
    //   setError('Mật khẩu mới phải khác mật khẩu cũ.')
    //   return
    // }
    // if (newPassword !== confirmPassword) {
    //   setError('Mật khẩu mới không trùng khớp.')
    //   return
    // }
    // if (!passwordRegex.test(newPassword)) {
    //   setError('Mật khẩu mới không thỏa mãn điều kiện bảo mật.')
    //   return
    // }
    try {
      const passwordType: ChangePasswordType = {
        currentPassword: oldPassword,
        newPassword: newPassword
      }
      const response = await changePasswordApi(passwordType)
      if (response && response.status === 200) {
        toast.success('Đổi mật khẩu thành công')
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        toast.error('Vui lòng nhập lại mật khẩu hiện tại')
      }
    } catch (error) {
      toast.error('Vui lòng nhập lại mật khẩu hiện tại')
    }
  }
  const handleOldPasswordBlur = () => {
    if (oldPassword == '') {
      setOldPasswordError('Vui lòng nhập mật khẩu hiện tại')
    } else {
      setOldPasswordError('')
    }
  }
  const handleNewPasswordBlur = () => {
    if (newPassword == '') {
      setPasswordError('Mật khẩu không được để trống')
    } else {
      if (newPassword === oldPassword) {
        setPasswordError('Mật khẩu mới phải khác mật khẩu hiện hiện tại')
      } else {
        if (!passwordRegex.test(newPassword) || newPassword.length < 8) {
          setPasswordError(
            'Mật khẩu mới phải đủ 8 ký tự chứa ít nhất một chữ cái viết hoa, một ký tự đặc biệt và một chữ số.'
          )
        } else {
          setPasswordError('')
        }
      }
    }
  }

  const handleConfirmBlur = () => {
    if (confirmPassword == '') {
      setConfirmError('Mật khẩu không được để trống')
    } else {
      if (newPassword !== confirmPassword) {
        setConfirmError('Mật khẩu xác nhận không trùng khớp.')
      } else {
        setConfirmError('')
      }
    }
  }

  return (
    <Container maxWidth='sm'>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 5
        }}
      >
        <Typography variant='h4' component='h1' gutterBottom>
          Đổi Mật Khẩu
        </Typography>
        {error && <Typography color='error'>{error}</Typography>}
        <TextField
          label='Mật Khẩu Cũ'
          type='password'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          margin='normal'
          fullWidth
          required
          onBlur={handleOldPasswordBlur}
          error={!!oldPasswordError}
          helperText={oldPasswordError}
        />
        <TextField
          label='Mật Khẩu Mới'
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onBlur={handleNewPasswordBlur}
          margin='normal'
          fullWidth
          required
          error={!!passwordError}
          helperText={passwordError}
        />
        <TextField
          label='Xác Nhận Mật Khẩu Mới'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleConfirmBlur}
          margin='normal'
          fullWidth
          required
          error={!!confirmError}
          helperText={confirmError}
        />
        <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
          Đổi Mật Khẩu
        </Button>
      </Box>
    </Container>
  )
}

export default ChangePassword
