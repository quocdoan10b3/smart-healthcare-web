/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImportMedicineType, MedicineType } from '@/@types/medicine'
import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Tooltip } from '@mui/material'
// import ImageSalonPas from '@/assets/images/salonpas.jpg'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { toast } from 'react-toastify'
import { importMedicineApi } from '@/services/MedicineService/medicineService'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getStaffIdByUserIdApi } from '@/services/AuthService/authService'
interface PropsType {
  medicine: MedicineType
  refreshMedicines: () => void
}
const MedicineItem = ({ medicine, refreshMedicines }: PropsType) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const role = useSelector((state: RootState) => state.auth.role)
  const [staffId, setStaffId] = useState(1)
  console.log('role:', role)

  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [expDate, setExpDate] = useState<Dayjs | null>(null)
  const [errors, setErrors] = useState({ quantity: '', expDate: '' })
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value))
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleQuantityBlur = () => {
    if (quantity <= 0) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        quantity: 'Số lượng phải lớn hơn 0'
      }))
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        quantity: ''
      }))
    }
  }
  const handleConfirm = async () => {
    const today = new Date()

    const errorsObj: any = {}
    let isValid = true

    if (quantity <= 0) {
      errorsObj.quantity = 'Số lượng phải lớn hơn 0'
      isValid = false
    }

    if (expDate && expDate.toDate() <= today) {
      errorsObj.expDate = 'Hạn sử dụng phải lớn hơn ngày hiện tại'
      isValid = false
    }

    setErrors(errorsObj)

    if (!isValid) return

    if (user) {
      const res = await getStaffIdByUserIdApi(user?.id)
      setStaffId(res.data.id)
    }
    const importMedicine: ImportMedicineType = {
      quantity: quantity,
      importDate: new Date().toISOString(),
      expDate: expDate ? expDate.format('YYYY-MM-DD') : '',
      medicineId: medicine.id,
      staffId: staffId
    }
    try {
      const response = await importMedicineApi(importMedicine)
      if (response && response.status === 200) {
        toast.success('Nhập thuốc thành công')
        setOpen(false)
        setQuantity(0)
        setExpDate(null)
        refreshMedicines()
      } else {
        console.error(`Nhập thuốc thất bại:`, response)
      }
    } catch (error) {
      console.log(`Nhập thuốc thất bại:`, error)
    }
  }
  const getCurrentDate = () => {
    return dayjs()
  }
  return (
    <div className='shadow-md p-2 rounded-lg mx-auto bg-green-100'>
      <Box sx={{ minWidth: 200 }}>
        <div className='flex justify-between'>
          <p className=''>{medicine.name}</p>
          <Tooltip title={medicine.effect} arrow>
            <InfoOutlinedIcon />
          </Tooltip>
        </div>
        <Box
          component='img'
          sx={{
            height: 130,
            display: 'block',
            maxWidth: 400,
            overflow: 'hidden',
            width: '100%',
            paddingTop: '10px'
          }}
          src={medicine.imageMedicine}
          // alt={step.label}
        />
        <div className='p-1'>
          {medicine.quantity === 0 ? (
            <div className='py-1 flex '>
              <p className='text-red-600 font-extralight'>
                <em>Hết thuốc !</em>
              </p>
            </div>
          ) : (
            <div className='flex justify-between py-1'>
              <p className='font-extralight'>Số lượng</p>
              <p className='text-red-800  font-extralight'>{medicine.quantity} </p>
            </div>
          )}
          {role && ['ADMIN'].includes(role.toUpperCase()) ? (
            <div className='flex justify-center pt-2'>
              <Button variant='contained' size='small' onClick={handleClickOpen}>
                Nhập thuốc
              </Button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>NHẬP THUỐC</DialogTitle> */}
        <h3 className='text-cyan-800 font-medium uppercase text-center text-2xl mt-5 mb-2'>Nhập thuốc</h3>
        <DialogContent>
          <div className='py-1 flex justify-between items-center gap-7'>
            <dt className='text-base font-medium text-gray-800 '>Tên thuốc</dt>
            <TextField
              type='text'
              name='nameMedicine'
              variant='outlined'
              size='small'
              value={medicine.name}
              sx={{ width: '64.5%' }}
              disabled={true}
            />
          </div>
          <div className='py-1 flex justify-between items-center gap-7'>
            <dt className='text-base font-medium text-gray-800 '>Tác dụng</dt>
            <TextField
              size='small'
              type='text'
              name='effect'
              variant='outlined'
              value={medicine.effect}
              sx={{ width: '64.5%' }}
              disabled={true}
              multiline
            />
          </div>
          <div className='py-1 flex justify-between items-center gap-7'>
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
              error={!!errors.quantity}
              helperText={errors.quantity}
              onBlur={handleQuantityBlur}
              sx={{ width: '64.5%' }}
            />
          </div>
          <div className='py-1 flex justify-between items-center gap-10'>
            <dt className='text-base font-medium text-gray-800 '>Hạn sử dụng</dt>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  value={expDate}
                  onChange={(newValue) => setExpDate(newValue)}
                  slotProps={{ textField: { size: 'small' } }}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleConfirm}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MedicineItem
