import { AddStudentType } from '@/@types/student'
import { addStudentApi } from '@/services/StudentService/studentService'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddStudentForm = ({ open, handleClose, refreshStudents }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [classes, setClasses] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null)
  const [gender, setGender] = useState('nam')
  const [address, setAddress] = useState('')
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = async () => {
    let gd = false
    if (gender == 'nam') gd = true
    const newStudent: AddStudentType = {
      email,
      password,
      fullName,
      userName,
      avatarUrl,
      class: classes,
      dateOfBirth: dateOfBirth ? dateOfBirth.format('YYYY-MM-DD') : '',
      gender: gd,
      address
    }
    try {
      const response = await addStudentApi(newStudent)
      if (response && response.status === 200) {
        handleClose()
        toast.success('Thêm học sinh thành công')
        refreshStudents()
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>THÊM HỌC SINH MỚI</DialogTitle>
      <DialogContent>
        <div className='py-1 flex justify-between items-center gap-7'>
          <dt className='text-base font-medium text-gray-800 '>Mã học sinh</dt>
          <TextField
            type='text'
            label='Nhập mã học sinh'
            name='studentCode'
            variant='outlined'
            value={userName}
            sx={{ width: '70%' }}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className='py-1 flex justify-between items-center gap-7'>
          <dt className='text-base font-medium text-gray-800 '>Tên học sinh</dt>
          <TextField
            type='text'
            label='Tên học sinh'
            name='name'
            fullWidth
            variant='outlined'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{ width: '300px' }}
          />
        </div>
        <div className='py-1 flex justify-between items-center gap-7'>
          <dt className='text-base font-medium text-gray-800 '>Lớp</dt>
          <TextField
            type='text'
            label='Lớp'
            name='class'
            fullWidth
            variant='outlined'
            value={classes}
            onChange={(e) => setClasses(e.target.value)}
            sx={{ width: '70%' }}
          />
        </div>
        <div className='py-1 flex justify-between items-center gap-1'>
          <dt className='text-base font-medium text-gray-800 '>Ngày sinh</dt>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label='Ngày sinh'
                value={dateOfBirth}
                onChange={(newValue) => setDateOfBirth(newValue)}
                sx={{ width: '300px' }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className='py-1 flex justify-between items-center gap-7'>
          <dt className='text-base font-medium text-gray-800 '>Email</dt>
          <TextField
            type='text'
            label='Email'
            name='email'
            fullWidth
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: '70%' }}
          />
        </div>
        <div className='py-1 flex justify-between items-center gap-7'>
          <dt className='text-base font-medium text-gray-800 '>Mật khẩu</dt>
          <TextField
            type={showPassword ? 'text' : 'password'}
            label='Password'
            name='password'
            fullWidth
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '70%' }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              right: '0',
              marginRight: '30px'
            }}
            aria-label='toggle password visibility'
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>
        <div className='py-1 flex justify-between items-center gap-7'>
          <dt className='text-base font-medium text-gray-800 '>Giới tính</dt>
          <Select
            name='gender'
            fullWidth
            variant='outlined'
            value={gender}
            onChange={(e) => setGender(e.target.value as string)}
            sx={{ width: '70%' }}
          >
            <MenuItem value='nam'>Nam</MenuItem>
            <MenuItem value='nữ'>Nữ</MenuItem>
          </Select>
        </div>
        <div className='py-1 flex justify-between items-center gap-7'>
          <dt className='text-base font-medium text-gray-800 '>Địa chỉ</dt>
          <TextField
            label='Địa chỉ'
            name='address'
            fullWidth
            variant='outlined'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ width: '70%' }}
          />
        </div>
      </DialogContent>
      <DialogActions className='mr-4 gap-5'>
        <Button onClick={handleClose} color='secondary' variant='contained' className='w-28 h-10 '>
          Hủy
        </Button>
        <Button onClick={handleSubmit} color='primary' variant='contained' className='w-28 h-10'>
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddStudentForm
