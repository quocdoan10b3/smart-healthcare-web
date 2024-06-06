import { HealthInsuranceType } from '@/@types/healthInsurance'
import { updateStatusInsuranceApi } from '@/services/HealthInsuranceService/healthInsuranceService'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'

interface PropsType {
  healthInsurance: HealthInsuranceType
  refreshInsurances: () => void
}

const HealthInsuranceItem = ({ healthInsurance, refreshInsurances }: PropsType) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUpdateStatus = async () => {
    const status = true
    await updateStatusInsuranceApi(healthInsurance.id, { status })
    refreshInsurances()
    handleClose()
  }

  return (
    <>
      <tr className='odd:bg-white even:bg-gray-50 border-b'>
        <th scope='row' className='px-6 py-4 font-medium text-cyan-800'>
          {healthInsurance.id}
        </th>
        <td className='px-6 py-4'>{healthInsurance.studentName}</td>
        <td className='px-6 py-4'>{healthInsurance.insuranceNumber}</td>
        <td className='px-6 py-4'>{healthInsurance.scholastic}</td>
        <td className='px-6 py-4'>
          {healthInsurance.status ? (
            'Đã hoàn thành'
          ) : (
            <Button onClick={handleClickOpen} size='small' variant='contained'>
              Cập nhật
            </Button>
          )}
        </td>
      </tr>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận cập nhật</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn xác nhận nộp bảo hiểm y tế này?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Hủy
          </Button>
          <Button onClick={handleUpdateStatus} color='primary' autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HealthInsuranceItem
