import { useState } from 'react'
import HeaderAdmin from './HeaderAdmin'
import { Button, TextField } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { StudentType } from '@/@types/student'
import { toast } from 'react-toastify'
import { AddHealthInsuranceType } from '@/@types/healthInsurance'
import { addHealthInsuranceApi } from '@/services/HealthInsuranceService/healthInsuranceService'
import { formatDateTime } from '@/helpers/formatDateTime'

const AddHealthInsurance = () => {
  const location = useLocation()
  const { student } = location.state as { student: StudentType }
  const idStudent = student.id
  const navigate = useNavigate()
  const [insuranceNumber, setInsuranceNumber] = useState('')
  const [status] = useState(false)
  const handleSubmit = async () => {
    const newHealthInsurance: AddHealthInsuranceType = {
      insuranceNumber: insuranceNumber,
      status: status,
      scholastic: new Date().getFullYear().toString()
    }
    console.log('idStudent:', idStudent)
    try {
      const response = await addHealthInsuranceApi(idStudent, newHealthInsurance)
      console.log('response add:', response)
      if (response && response.status === 200) {
        toast.success('Thêm bảo hiểm y tế cho học sinh thành công')
        navigate('/admin-manage-health-insurances')
      } else {
        console.error(`Thêm bảo hiểm y tế cho học sinh thất bại:`, response)
      }
    } catch (error) {
      console.log(`Thêm bảo hiểm y tế cho học sinh thất bại:`, error)
    }
  }
  return (
    <div className='p-4'>
      <HeaderAdmin title='Tạo hồ sơ khám sức khỏe cho học sinh' />
      <div className=' max-w-2xl sm:max-w-s md:max-w-sm lg:max-w-lg xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto bg-green-100 overflow-hidden shadow rounded-lg border mt-10'>
        <form>
          <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
            <p className='text-cyan-600 text-2xl text-center mt-5 mb-5'>Đăng ký bảo hiểm y tế</p>
            <dl className='sm:divide-y sm:divide-gray-200'>
              <div className='py-3 flex justify-between items-center gap-5'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Họ tên</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='name'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={student.studentName}
                    disabled={true}
                    InputProps={{
                      inputProps: {
                        style: { fontWeight: 'bold' }
                      }
                    }}
                  />
                </div>
              </div>
              <div className='py-3 flex justify-between items-center gap-5'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Ngày sinh</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='dateOfBirth'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={formatDateTime(student.date)}
                    disabled={true}
                    InputProps={{
                      inputProps: {
                        style: { fontWeight: 'bold' }
                      }
                    }}
                  />
                </div>
              </div>
              <div className='py-3 flex justify-between items-center gap-5'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Địa chỉ</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='address'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={student.address}
                    disabled={true}
                    InputProps={{
                      inputProps: {
                        style: { fontWeight: 'bold' }
                      }
                    }}
                  />
                </div>
              </div>
              <div className='py-3 flex justify-between items-center gap-5'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Giới tính</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='gender'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={student.gender ? 'Nam' : 'Nữ'}
                    disabled={true}
                    InputProps={{
                      inputProps: {
                        style: { fontWeight: 'bold' }
                      }
                    }}
                  />
                </div>
              </div>
              <div className='py-3 flex justify-between items-center gap-5 font'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Số thẻ BHYT</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='insurance'
                    placeholder='Nhập số thẻ BHYT'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={insuranceNumber}
                    onChange={(e) => setInsuranceNumber(e.target.value)}
                  />
                </div>
              </div>
            </dl>

            <div className='py-3 flex justify-center items-center gap-5'>
              <Button
                variant='contained'
                color='primary'
                className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-32'
                onClick={handleSubmit}
              >
                Lưu
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddHealthInsurance
