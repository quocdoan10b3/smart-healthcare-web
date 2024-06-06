// AddMedicineForm.js or AddMedicineForm.tsx
import { Button, TextField } from '@mui/material'
import { useRef, useState } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ImageChangeOneFile } from '@/helpers/changeFileImage'
import { AddNewsType } from '@/@types/notification'
import { addNewsApi } from '@/services/FeedbackService/feedbackService'
import { getStaffIdByUserIdApi } from '@/services/AuthService/authService'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
const AddNewsForm = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const role = useSelector((state: RootState) => state.auth.role)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('https://minio.whitemage.fun/healthcare/virus.jpg')
  const [imageFile, setImageFile] = useState<File>()
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const handleAvatarChange = () => {
    if (fileInputRef.current) {
      const fileInput = fileInputRef.current as HTMLInputElement
      fileInput.click()
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    if (selectedFile) {
      setImageFile(selectedFile)
      const newAvatarUrl = URL.createObjectURL(selectedFile)
      setAvatarUrl(newAvatarUrl)
    }
  }
  const handleAddNews = async () => {
    console.log(avatarUrl)
    console.log('imageFile:', imageFile)
    if (imageFile && user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const resImage = await ImageChangeOneFile(imageFile)
      const res = await getStaffIdByUserIdApi(user.id)
      const staffId = res.data.id
      const addNews: AddNewsType = {
        title: title,
        content: content,
        dateCreatAt: new Date().toISOString(),
        image: resImage,
        staffId: Number(staffId)
      }
      try {
        const response = await addNewsApi(addNews)
        console.log('response:', response)

        if (response && response.status === 200) {
          toast.success('Thêm tin tức thành công')
          if (role && role.toUpperCase() === 'ADMIN') navigate('/admin')
          else navigate('/staff')
        } else {
          console.error(`Thất bại:`, response)
        }
      } catch (error) {
        console.log(`Thất bại:`, error)
      }
    }
  }
  return (
    <div className='p-4'>
      <div className=' max-w-2xl sm:max-w-s md:max-w-sm lg:max-w-lg xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto bg-green-100 overflow-hidden shadow rounded-lg border mt-10'>
        <form>
          <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
            <p className='text-cyan-600 text-2xl text-center mt-5 mb-5 uppercase'>THÊM TIN TỨC CHO TRANG WEB</p>
            <dl className='sm:divide-y sm:divide-gray-200'>
              <div className='py-1 flex justify-center items-center gap-7 px-4'>
                <div className='inline-flex mb-5'>
                  <img
                    alt='Avatar của thuốc'
                    src={avatarUrl}
                    width={200}
                    height={200}
                    style={{ borderRadius: '15%' }}
                  />
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
              </div>
              <div className='py-1 flex justify-between items-center gap-7 px-4'>
                <dt className='text-base font-medium text-gray-800 '>Tiêu đề</dt>
                <TextField
                  type='text'
                  multiline
                  variant='outlined'
                  value={title}
                  sx={{ width: '70%' }}
                  size='small'
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Nhập tiều đề'
                />
              </div>
              <div className='py-1 flex justify-between items-center gap-7 px-4'>
                <dt className='text-base font-medium text-gray-800 '>Nội dung</dt>
                <TextField
                  size='small'
                  type='text'
                  name='effect'
                  variant='outlined'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{ width: '70%' }}
                  multiline
                  placeholder='Nhập nội dung'
                />
              </div>
            </dl>

            {role && role.toUpperCase() === 'STAFF' && (
              <div className='py-3 flex justify-center items-center gap-5 mt-5'>
                <Button
                  variant='contained'
                  color='primary'
                  className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-32'
                  onClick={handleAddNews}
                >
                  Thêm
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewsForm
