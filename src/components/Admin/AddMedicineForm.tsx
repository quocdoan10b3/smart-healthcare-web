/* eslint-disable @typescript-eslint/no-explicit-any */
// AddMedicineForm.js or AddMedicineForm.tsx
import { Button, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useRef, useState } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { ImportNewMedicineType } from '@/@types/medicine'
import { importNewMedicineApi } from '@/services/MedicineService/medicineService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ImageChangeOneFile } from '@/helpers/changeFileImage'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getStaffIdByUserIdApi } from '@/services/AuthService/authService'
const AddMedicineForm = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const role = useSelector((state: RootState) => state.auth.role)
  const [staffId, setStaffId] = useState(1)
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [effect, setEffect] = useState('')
  const [expDate, setExpDate] = useState<Dayjs | null>(null)
  const [avatarUrl, setAvatarUrl] = useState('https://minio.whitemage.fun/healthcare/medicinebox.jpg')
  const [imageFile, setImageFile] = useState<File>()
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    let isValid = true
    const errorsObj: any = {}
    if (!name.trim()) {
      errorsObj.name = 'Vui lòng nhập tên thuốc'
      isValid = false
    }

    // Kiểm tra số lượng
    if (quantity <= 0) {
      errorsObj.quantity = 'Số lượng phải lớn hơn 0'
      isValid = false
    }

    // Kiểm tra tác dụng
    if (!effect.trim()) {
      errorsObj.effect = 'Vui lòng nhập tác dụng của thuốc'
      isValid = false
    }

    // Kiểm tra ngày hết hạn
    if (!expDate) {
      errorsObj.expDate = 'Vui lòng chọn ngày hết hạn'
      isValid = false
    }
    setErrors(errorsObj)
    return isValid
  }
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value))
  }
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
  const handleAddMedicine = async () => {
    const isValid = validateForm()

    if (!isValid) {
      return
    }
    if (user) {
      const res = await getStaffIdByUserIdApi(user?.id)
      setStaffId(res.data.id)
    }
    console.log(avatarUrl)
    console.log('imageFile:', imageFile)
    if (imageFile) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const resImage = await ImageChangeOneFile(imageFile)
      const importMedicine: ImportNewMedicineType = {
        nameMedicine: name,
        quantity: quantity,
        effect: effect,
        importDate: new Date().toISOString(),
        expDate: expDate ? expDate.format('YYYY-MM-DD') : '',
        imageMedicine: resImage,
        staffId: staffId
      }
      try {
        const response = await importNewMedicineApi(importMedicine)
        console.log('response:', response)

        if (response && response.status === 200) {
          toast.success('Nhập thuốc thành công')
          if (role && role.toUpperCase() === 'ADMIN') navigate('/admin-manage-medicines')
          else navigate('/view-medicines')
          setAvatarUrl('https://minio.whitemage.fun/healthcare/medicinebox.jpg')
          setEffect('')
          setQuantity(0)
          setExpDate(null)
          setName('')
        } else {
          console.error(`Nhập thuốc thất bại:`, response)
        }
      } catch (error) {
        console.log(`Nhập thuốc thất bại:`, error)
      }
    }
  }
  const getCurrentDate = () => {
    return dayjs()
  }
  const handleBlur = (field: string) => {
    const newErrors = { ...errors }

    switch (field) {
      case 'name':
        if (!name.trim()) {
          newErrors.name = 'Vui lòng nhập tên thuốc'
        } else {
          newErrors.name = ''
        }
        break
      case 'quantity':
        if (quantity <= 0) {
          newErrors.quantity = 'Số lượng phải lớn hơn 0'
        } else {
          newErrors.quantity = ''
        }
        break
      case 'effect':
        if (!effect.trim()) {
          newErrors.effect = 'Vui lòng nhập tác dụng của thuốc'
        } else {
          newErrors.effect = ''
        }
        break
      case 'expDate':
        if (!expDate) {
          newErrors.expDate = 'Vui lòng chọn ngày hết hạn'
        } else {
          newErrors.expDate = ''
        }
        break
      default:
        break
    }
    setErrors(newErrors)
  }
  return (
    <div className='p-4'>
      <div className=' max-w-2xl sm:max-w-s md:max-w-sm lg:max-w-lg xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto bg-green-100 overflow-hidden shadow rounded-lg border mt-10'>
        <form>
          <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
            <p className='text-cyan-600 text-2xl text-center mt-5 mb-5 uppercase'>Nhập thuốc</p>
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
                <dt className='text-base font-medium text-gray-800 '>Tên thuốc</dt>
                <TextField
                  type='text'
                  multiline
                  variant='outlined'
                  value={name}
                  sx={{ width: '70%' }}
                  size='small'
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Nhập tên thuốc'
                  error={!!errors.name}
                  helperText={errors.name}
                  onBlur={() => handleBlur('name')}
                />
              </div>
              <div className='py-1 flex justify-between items-center gap-7 px-4'>
                <dt className='text-base font-medium text-gray-800 '>Tác dụng</dt>
                <TextField
                  size='small'
                  type='text'
                  name='effect'
                  variant='outlined'
                  value={effect}
                  onChange={(e) => setEffect(e.target.value)}
                  sx={{ width: '70%' }}
                  multiline
                  placeholder='Nhập tác dụng của thuốc'
                  error={!!errors.effect}
                  helperText={errors.effect}
                  onBlur={() => handleBlur('effect')}
                />
              </div>
              <div className='py-1 flex justify-between items-center gap-7 px-4'>
                <dt className='text-base font-medium text-gray-800 '>Số lượng</dt>
                <TextField
                  autoFocus
                  margin='dense'
                  type='number'
                  size='small'
                  fullWidth
                  variant='outlined'
                  value={quantity}
                  onChange={handleQuantityChange}
                  sx={{ width: '70%' }}
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                  onBlur={() => handleBlur('quantity')}
                />
              </div>
              <div className='py-1 flex justify-between items-center px-4'>
                <dt className='text-base font-medium text-gray-800 '>Hạn sử dụng</dt>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={expDate}
                      onChange={(newValue) => setExpDate(newValue)}
                      slotProps={{ textField: { size: 'small' } }}
                      sx={{ width: '335px' }}
                      format='DD/MM/YYYY'
                      minDate={getCurrentDate()}
                      onError={(error) => {
                        if (error) {
                          setErrors((prevErrors: any) => ({
                            ...prevErrors,
                            expDate: 'Ngày không hợp lệ'
                          }))
                        } else {
                          setErrors((prevErrors: any) => ({
                            ...prevErrors,
                            expDate: ''
                          }))
                        }
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </dl>

            <div className='py-3 flex justify-center items-center gap-5 mt-5'>
              <Button
                variant='contained'
                color='primary'
                className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-32'
                onClick={handleAddMedicine}
              >
                Thêm
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMedicineForm
