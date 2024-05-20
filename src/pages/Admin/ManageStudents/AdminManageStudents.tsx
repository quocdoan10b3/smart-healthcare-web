import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  TextField
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { AddStudentType, StudentType } from '@/@types/student'
import { addStudentApi, getAllStudentsApi } from '@/services/StudentService/studentService'
import StudentItem from './StudentItem'
// import { formatDateTime } from '@/helpers/formatDateTime'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { toast } from 'react-toastify'
import { Visibility, VisibilityOff } from '@mui/icons-material'
const AdminManageStudents = () => {
  const [search, setSearch] = useState<string>('')

  const [showPassword, setShowPassword] = useState(false)
  const [listStudents, setListStudents] = useState<StudentType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [classes, setClasses] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null)
  const [gender, setGender] = useState('nam')
  const [address, setAddress] = useState('')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string)
  }
  useEffect(() => {
    getListStudents(currentPage, search)
  }, [currentPage, search])
  const getListStudents = async (currentPage: number, search: string) => {
    try {
      const response = await getAllStudentsApi(currentPage, search)
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages)
        setListStudents(response.data.items)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  const handleAddStudent = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setEmail('')
    setPassword('')
    setFullName('')
    setUserName('')
    setAvatarUrl('')
    setClasses('')
    setDateOfBirth(null)
    setGender('nam')
    setAddress('')
    setOpenDialog(false)
  }

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
        handleCloseDialog()
        toast.success('Thêm học sinh thành công')
        setEmail('')
        setPassword('')
        setFullName('')
        setUserName('')
        setAvatarUrl('')
        setClasses('')
        setDateOfBirth(null)
        setGender('nam')
        setAddress('')
        getListStudents(currentPage, search)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='p-4 '>
      <HeaderAdmin title='Quản lý danh sách học sinh' />
      <div className='flex justify-between'>
        <Button variant='contained' onClick={handleAddStudent} sx={{ width: 200, background: '#068124', my: 2 }}>
          Thêm học sinh
        </Button>
        <TextField
          size='small'
          label='Tìm kiếm'
          variant='outlined'
          value={search}
          onChange={handleSearchChange}
          sx={{ width: 300, background: 'white', ml: 'auto', my: 2 }}
        />
      </div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Mã học sinh
              </th>
              <th scope='col' className='px-6 py-3'>
                Tên học sinh
              </th>
              <th scope='col' className='px-6 py-3'>
                Lớp
              </th>
              <th scope='col' className='px-6 py-3'>
                Ngày sinh
              </th>
              <th scope='col' className='px-6 py-3'>
                Giới tính
              </th>
              <th scope='col' className='px-6 py-3'>
                Địa chỉ
              </th>
            </tr>
          </thead>
          <tbody>
            {listStudents.map((hr) => (
              <StudentItem student={hr} />
            ))}
          </tbody>
        </table>
        <div className='py-4 px-4 flex justify-end'>
          <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
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
          <Button onClick={handleCloseDialog} color='secondary' variant='contained' className='w-28 h-10 '>
            Hủy
          </Button>
          <Button onClick={handleSubmit} color='primary' variant='contained' className='w-28 h-10'>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AdminManageStudents
