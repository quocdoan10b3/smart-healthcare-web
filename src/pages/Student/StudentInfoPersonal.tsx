import { UpdateStudentType } from '@/@types/student'
import { ImageChangeOneFile } from '@/helpers/changeFileImage'
import { formatDateTime } from '@/helpers/formatDateTime'
import { updateAvatarUserApi } from '@/services/AuthService/authService'
import { getStudentByIdApi, updateStudentById } from '@/services/StudentService/studentService'
import { RootState } from '@/store'
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { saveInfoUserUpdate } from '@/redux-toolkit/auth.slice'
import { InfoAccountPut } from '@/@types/user'

const StudentInfoPersonal = () => {
  const id = useSelector((state: RootState) => state.auth.user?.id)
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState('')
  const [studentCode, setStudentCode] = useState('')
  const [email, setEmail] = useState('')
  const [classes, setClasses] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('Nam')
  const [address, setAddress] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  // const [avatarString, setAvatarString] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef(null)
  const [studentId, setStudentId] = useState()
  const handleAvatarChange = () => {
    if (fileInputRef.current) {
      const fileInput = fileInputRef.current as HTMLInputElement
      fileInput.click()
    }
  }
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    if (selectedFile) {
      const newAvatarUrl = URL.createObjectURL(selectedFile)
      setAvatarUrl(newAvatarUrl)
      if (id) {
        try {
          const resImage = await ImageChangeOneFile(selectedFile)
          // setAvatarString(resImage)
          // console.log(avatarString)
          // console.log('avatarString:', avatarString)
          const infoAccount: InfoAccountPut = {
            avatarUrl: resImage,
            email: email
          }
          await updateAvatarUserApi(id, { avatarUrl: resImage })
          dispatch(saveInfoUserUpdate(infoAccount))
          toast.success('Cập nhật avatar thành công')
        } catch (error) {
          console.log(`Cập nhật avatar thất bại:`, error)
        }
      } else console.log('id khong ton tai')
    }
  }

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
          setAvatarUrl(response.data.avatarUrl)
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
    <div className='p-4'>
      <div className=' max-w-2xl sm:max-w-s md:max-w-sm lg:max-w-lg xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto bg-green-100 overflow-hidden shadow rounded-lg border mt-5'>
        <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
          <p className='text-cyan-600 text-2xl text-center mt-5 mb-5'>Thông tin cá nhân</p>
          <div className='flex justify-center'>
            <img alt='Avatar của thuốc' src={avatarUrl} width={100} height={100} style={{ borderRadius: '50%' }} />
            <Button onClick={handleAvatarChange} className='mb-20' size='small' sx={{ width: 40, height: 40 }}>
              <AddAPhotoIcon />
            </Button>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          <div className='flex justify-center mr-16'>
            <p className='text-lg'>{fullName}</p>
          </div>
          <dl className='sm:divide-y sm:divide-gray-200'>
            {/* <div className='py-3 flex justify-between items-center gap-5'>
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
            </div> */}
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
