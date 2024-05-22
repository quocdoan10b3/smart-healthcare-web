import { UpdateStudentType } from '@/@types/student'
import { formatDateTime } from '@/helpers/formatDateTime'
import { getStudentByIdApi, updateStudentById } from '@/services/StudentService/studentService'
import { RootState } from '@/store'
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const StudentInfoPersonal = () => {
  const id = useSelector((state: RootState) => state.auth.user?.id)
  const [fullName, setFullName] = useState('')
  const [studentCode, setStudentCode] = useState('')
  const [email, setEmail] = useState('')
  const [classes, setClasses] = useState('')
  // const [avatarUrl, setAvatarUrl] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('Nam')
  const [address, setAddress] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [studentId, setStudentId] = useState()
  useEffect(() => {
    const getStudentById = async (id: number) => {
      try {
        const response = await getStudentByIdApi(id)
        if (response && response.status === 200) {
          console.log(response.data)
          setFullName(response.data.studentName)
          setStudentCode(response.data.studentCode)
          setAddress(response.data.address)
          setEmail(response.data.email)
          setClasses(response.data.class)
          // setAvatarUrl(response.data.avatarUrl)
          setDateOfBirth(response.data.date)
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setStudentId(response.data.id)
          if (response.data.gender == true) setGender('Nam')
        }
      } catch (error) {
        console.error('Error fetching information personal:', error)
      }
    }
    if (id) {
      getStudentById(Number(id))
    }
  }, [id])
  let gt = true
  if (gender == 'Nam') gt = true
  if (gender == 'Nữ') gt = false
  const handleSaveInfoPersonal = async () => {
    setIsEditing((prev) => !prev)
    const infoStudentUpdate: UpdateStudentType = {
      class: classes,
      address: address,
      dateOfBirth: dateOfBirth,
      gender: gt
    }
    console.log('studentId:', studentId)
    try {
      if (studentId !== undefined) {
        const response = await updateStudentById(studentId, infoStudentUpdate)
        console.log(response)
        if (response && response.status === 200) {
          toast.success('Cập nhật thông tin cá nhân thành công')
        } else {
          console.error(`Failed to update info student:`, response)
        }
      }
    } catch (error) {
      console.log(`Error updating info student:`, error)
    }
  }
  const date = formatDateTime(dateOfBirth)
  return (
    <div>
      <div className=' max-w-2xl sm:max-w-s md:max-w-sm lg:max-w-lg xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto bg-green-100 overflow-hidden shadow rounded-lg border'>
        <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
          <p className='text-cyan-600 text-2xl text-center mt-5 mb-5'>Thông tin cá nhân</p>
          <dl className='sm:divide-y sm:divide-gray-200'>
            <div className='py-3 flex justify-between items-center gap-5'>
              <dt className='text-base font-medium text-gray-500 px-4 '>Họ tên</dt>
              <div className='flex gap-4 justify-between mr-4'>
                <TextField
                  name='fullName'
                  id='fullName'
                  type='text'
                  sx={{ width: '340px' }}
                  size='small'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div className='py-3 flex justify-between items-center gap-5'>
              <dt className='text-base font-medium text-gray-500 px-4 '>Mã học sinh</dt>
              <div className='flex gap-4 justify-between mr-4'>
                <TextField
                  name='studentCode'
                  id='studentCode'
                  type='text'
                  sx={{ width: '340px' }}
                  size='small'
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div className='py-3 flex justify-between items-center gap-5'>
              <dt className='text-base font-medium text-gray-500 px-4 '>Email</dt>
              <div className='flex gap-4 justify-between mr-4'>
                <TextField
                  name='email'
                  id='email'
                  type='email'
                  sx={{ width: '340px' }}
                  size='small'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div className='py-3 flex justify-between items-center gap-5'>
              <dt className='text-base font-medium text-gray-500 px-4 '>Lớp</dt>
              <div className='flex gap-4 justify-between mr-4'>
                <TextField
                  name='classes'
                  id='classes'
                  type='text'
                  sx={{ width: '340px' }}
                  size='small'
                  value={classes}
                  onChange={(e) => setClasses(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className='py-3 flex justify-between items-center gap-5'>
              <dt className='text-base font-medium text-gray-500 px-4 '>Ngày sinh</dt>
              <div className='flex gap-4 justify-between mr-4'>
                <TextField
                  name='dateOfBirth'
                  id='dateOfBirth'
                  type='text'
                  sx={{ width: '340px' }}
                  size='small'
                  value={date}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className='py-3 flex justify-between items-center gap-5'>
              <dt className='text-base font-medium text-gray-500 px-4 '>Giới tính</dt>
              <div className='flex gap-4 flex-1 mr-4 ml-10'>
                <FormControl component='fieldset'>
                  <RadioGroup row name='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                    <FormControlLabel value='Nam' control={<Radio />} label='Nam' disabled={!isEditing} />
                    <FormControlLabel value='Nữ' control={<Radio />} label='Nữ' disabled={!isEditing} />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className='py-3 flex justify-between items-center gap-5'>
              <dt className='text-base font-medium text-gray-500 px-4 '>Địa chỉ</dt>
              <div className='flex gap-4 justify-between mr-4'>
                <TextField
                  name='address'
                  id='address'
                  type='text'
                  sx={{ width: '340px' }}
                  size='small'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </dl>
          <div className='py-3 flex justify-center items-center gap-5'>
            {isEditing ? (
              <Button
                variant='contained'
                color='primary'
                className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40'
                onClick={handleSaveInfoPersonal}
              >
                Lưu
              </Button>
            ) : (
              <Button
                variant='contained'
                color='secondary'
                className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40'
                onClick={() => setIsEditing(!isEditing)}
              >
                Chỉnh sửa
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentInfoPersonal
