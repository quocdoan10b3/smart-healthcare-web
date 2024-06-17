import { StaffType } from '@/@types/staff'
import { formatDateTime } from '@/helpers/formatDateTime'
import { deleteUserApi } from '@/services/AuthService/authService'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface PropsType {
  staff: StaffType
  refreshStaff: () => void
}
const StaffItem = ({ staff, refreshStaff }: PropsType) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = async () => {
    await deleteUserApi(staff.userId)
    toast.success('Nhân viên đã được xóa thành công')
    refreshStaff()
    handleClose()
  }
  return (
    <>
      <tr className='odd:bg-white even:bg-gray-50 border-b '>
        <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
          {staff.id}
        </th>
        <td className='px-6 py-4'>{staff.fullName}</td>
        <td className='px-6 py-4'>{formatDateTime(staff.date)}</td>
        <td className='px-6 py-4'>{staff.gender ? 'Nam' : 'Nữ'}</td>
        <td className='px-6 py-4'>{staff.address}</td>
        <td className='px-6 py-4'>
          <Button onClick={handleClickOpen} size='small' variant='contained'>
            Xóa nhân viên
          </Button>
        </td>
      </tr>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa nhân viên</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn khi xóa nhân viên này?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Hủy
          </Button>
          <Button onClick={handleDelete} color='primary' autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default StaffItem
