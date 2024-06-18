/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddStudentType } from '@/@types/student'
import { addStudentApi } from '@/services/StudentService/studentService'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
interface PropsType {
  open: boolean
  handleClose: () => void
  refreshStudents: () => void
}
const AddStudentForm = ({ open, handleClose, refreshStudents }: PropsType) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [avatarUrl] = useState('https://minio.whitemage.fun/healthcare/avatar_default.jpg')
  const [classes, setClasses] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null)
  const [gender, setGender] = useState('nam')
  const [address, setAddress] = useState('')

  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    let valid = true
    const errorsObj: any = {}

    if (!userName.match(/^HS\d{4}\d{3}$/)) {
      errorsObj.userName = 'Mã học sinh không hợp lệ'
      valid = false
    }

    if (!fullName.trim()) {
      errorsObj.fullName = 'Vui lòng nhập tên học sinh'
      valid = false
    }

    if (!classes.match(/^\d{1}\/\d{1}$/)) {
      errorsObj.classes = 'Lớp không hợp lệ'
      valid = false
    }

    if (!dateOfBirth) {
      errorsObj.dateOfBirth = 'Vui lòng chọn ngày sinh'
      valid = false
    }

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errorsObj.email = 'Email không hợp lệ'
      valid = false
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
      errorsObj.password = 'Mật khẩu không hợp lệ'
      valid = false
    }

    if (!address.trim()) {
      errorsObj.address = 'Vui lòng nhập địa chỉ'
      valid = false
    }

    setErrors(errorsObj)
    return valid
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      let gd = false
      if (gender === 'nam') gd = true
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
          setAddress('')
          setClasses('')
          setDateOfBirth(null)
          setEmail('')
          setFullName('')
          setGender('nam')
          setPassword('')
          setShowPassword(false)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      {/* <DialogTitle>THÊM HỌC SINH MỚI</DialogTitle> */}
      <h3 className='text-cyan-800 font-medium uppercase text-center text-2xl mt-5 mb-2'>THÊM HỌC SINH MỚI</h3>
      <DialogContent>
        <div className='py-1 flex justify-between items-center gap-7 mb-1'>
          <dt className='text-base font-medium text-gray-800 '>Mã học sinh</dt>
          <TextField
            type='text'
            label='Nhập mã học sinh'
            name='studentCode'
            variant='outlined'
            value={userName}
            sx={{ width: '70%' }}
            onChange={(e) => setUserName(e.target.value)}
            error={!!errors.userName}
            helperText={errors.userName}
            size='small'
            onBlur={(e) => {
              if (!e.target.value.match(/^HS\d{4}\d{3}$/)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  userName: 'Mã học sinh không hợp lệ'
                }))
              } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  userName: ''
                }))
              }
            }}
          />
        </div>
        <div className='py-1 flex justify-between items-center gap-7 mb-1'>
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
            error={!!errors.fullName}
            helperText={errors.fullName}
            size='small'
            onBlur={(e) => {
              if (!e.target.value.trim()) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  fullName: 'Vui lòng nhập tên học sinh'
                }))
              } else {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  fullName: ''
                }))
              }
            }}
          />
        </div>
        <div className='py-1 flex justify-between items-center gap-7 mb-1'>
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
            error={!!errors.classes}
            helperText={errors.classes}
            size='small'
            onBlur={(e) => {
              if (!e.target.value.match(/^\d{1}\/\d{1}$/)) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  classes: 'Lớp không hợp lệ'
                }))
              } else {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  classes: ''
                }))
              }
            }}
          />
        </div>
        <div className='py-1 flex justify-between items-center gap-1 mb-1'>
          <dt className='text-base font-medium text-gray-800 '>Ngày sinh</dt>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  maxDate={dayjs('2013-12-31')}
                  label='Ngày sinh'
                  value={dateOfBirth}
                  onChange={(newValue) => setDateOfBirth(newValue)}
                  sx={{ width: '300px' }}
                  format='DD/MM/YYYY'
                  slotProps={{ textField: { size: 'small' } }}
                  onError={(error) => {
                    if (error) {
                      setErrors((prevErrors: any) => ({
                        ...prevErrors,
                        dateOfBirth: 'Ngày sinh không hợp lệ'
                      }))
                    } else {
                      setErrors((prevErrors: any) => ({
                        ...prevErrors,
                        dateOfBirth: ''
                      }))
                    }
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <div style={{ color: 'red', fontSize: '0.75rem', marginLeft: '10px' }}>{errors.dateOfBirth}</div>
          </div>
        </div>
        <div className='py-1 flex justify-between items-center gap-7 mb-1'>
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
            error={!!errors.email}
            helperText={errors.email}
            size='small'
            onBlur={(e) => {
              if (!e.target.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  email: 'Email không hợp lệ'
                }))
              } else {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  email: ''
                }))
              }
            }}
          />
        </div>
        <div className='py-1 flex justify-between items-center gap-7 mb-1'>
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
            error={!!errors.password}
            helperText={errors.password}
            size='small'
            onBlur={(e) => {
              if (!e.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  password: 'Mật khẩu không hợp lệ'
                }))
              } else {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  password: ''
                }))
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className='py-1 flex justify-between items-center gap-7 mb-1'>
          <dt className='text-base font-medium text-gray-800 '>Giới tính</dt>
          <Select
            name='gender'
            fullWidth
            variant='outlined'
            value={gender}
            onChange={(e) => setGender(e.target.value as string)}
            sx={{ width: '70%' }}
            size='small'
          >
            <MenuItem value='nam'>Nam</MenuItem>
            <MenuItem value='nữ'>Nữ</MenuItem>
          </Select>
        </div>
        <div className='py-1 flex justify-between items-center gap-7 mb-1'>
          <dt className='text-base font-medium text-gray-800 '>Địa chỉ</dt>
          <TextField
            multiline
            label='Địa chỉ'
            name='address'
            fullWidth
            variant='outlined'
            value={address}
            error={!!errors.address}
            helperText={errors.address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ width: '70%' }}
            size='small'
            onBlur={(e) => {
              if (!e.target.value.trim()) {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  address: 'Vui lòng nhập địa chỉ'
                }))
              } else {
                setErrors((prevErrors: any) => ({
                  ...prevErrors,
                  address: ''
                }))
              }
            }}
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
