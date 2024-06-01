import { StudentType } from '@/@types/student'
import { formatDateTime } from '@/helpers/formatDateTime'
import { checkStudentIsExamined } from '@/services/HealthRecordService/healthRecordService'
import { Button, Menu, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
interface PropsType {
  student: StudentType
}
const StudentItem = ({ student }: PropsType) => {
  const navigate = useNavigate()
  const [hasHealthCheck, setHasHealthCheck] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  useEffect(() => {
    const healthCheckStatus = async () => {
      try {
        const response = await checkStudentIsExamined(student.id)
        setHasHealthCheck(response.data)
        console.log('hr:', response)
      } catch (error) {
        console.error('Error fetching health record status:', error)
      }
    }

    healthCheckStatus()
  }, [student.id])
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleAddHealthRecord = () => {
    navigate('/add-health-record', { state: { student } })
  }

  const handleAddBHYT = () => {
    navigate('/add-health-insurance')
  }

  const handleUseMedicine = () => {
    navigate('/admin-use-medicine')
  }
  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {student.id}
      </th>
      <td className='px-3 py-4'>{student.studentCode}</td>
      <td className='px-3 py-4'>{student.studentName}</td>
      <td className='px-3 py-4'>{student.class}</td>
      <td className='px-3 py-4'>{formatDateTime(student.date)}</td>
      <td className='px-3 py-4'>{student.gender ? 'Nam' : 'Nữ'}</td>
      <td className='px-3 py-4'>{student.address}</td>
      <td className='px-3 py-4'>
        <Button
          aria-controls={open ? 'action-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant='contained'
        >
          Lựa chọn
        </Button>
        <Menu
          id='action-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'action-button'
          }}
        >
          {!hasHealthCheck && <MenuItem onClick={handleAddHealthRecord}>Thêm hồ sơ khám sức khỏe</MenuItem>}
          <MenuItem onClick={handleAddBHYT}>Thêm BHYT</MenuItem>
          <MenuItem onClick={handleUseMedicine}>Sử dụng thuốc</MenuItem>
        </Menu>
      </td>
    </tr>
  )
}

export default StudentItem