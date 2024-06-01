import { useState } from 'react'
import HeaderAdmin from './HeaderAdmin'
import { Button, InputAdornment, TextField } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { StudentType } from '@/@types/student'
import { AddHealthRecordType } from '@/@types/healthRecord'
import { toast } from 'react-toastify'
import { addHealthRecordApi } from '@/services/HealthRecordService/healthRecordService'

const AddHealthRecord = () => {
  const location = useLocation()
  const { student } = location.state as { student: StudentType }
  const idStudent = student.id
  const navigate = useNavigate()
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [eye, setEye] = useState('')
  const [hearing, setHearing] = useState('')
  const [dentalHealth, setDentalHealth] = useState('')
  const [allergy, setAllergy] = useState('')
  const [note, setNote] = useState('')
  const currentTime = new Date()
  const handleSubmit = async () => {
    const newHealthRecord: AddHealthRecordType = {
      examDate: currentTime.toISOString(),
      height: parseInt(height),
      weight: parseInt(weight),
      vision: parseInt(eye),
      hearing: hearing,
      dentalHealth: dentalHealth,
      allergies: allergy,
      notes: note
    }
    console.log('idStudent:', idStudent)
    try {
      const response = await addHealthRecordApi(idStudent, newHealthRecord)
      console.log('response add:', response)
      if (response && response.status === 200) {
        toast.success('Thêm hồ sơ khám sức khỏe thành công')
        navigate('/admin-manage-health-records')
      } else {
        console.error(`Thêm hồ sơ khám sức khỏe thất bại:`, response)
      }
    } catch (error) {
      console.log(`Thêm hồ sơ khám sức khỏe thất bại:`, error)
    }
  }
  return (
    <div className='p-4'>
      <HeaderAdmin title='Tạo hồ sơ khám sức khỏe cho học sinh' />
      <div className=' max-w-2xl sm:max-w-s md:max-w-sm lg:max-w-lg xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto bg-green-100 overflow-hidden shadow rounded-lg border'>
        <form>
          <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
            <p className='text-cyan-600 text-2xl text-center mt-5 mb-5'>Phiếu khám sức khỏe</p>
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
              <div className='py-3 flex justify-between items-center gap-5 font'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Chiều cao </dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='height'
                    placeholder='Nhập chiều cao'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>cm</InputAdornment>
                    }}
                  />
                </div>
              </div>
              <div className='py-3 flex justify-between items-center gap-5 font'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Cân nặng</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='weight'
                    placeholder='Nhập cân nặng'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>kg</InputAdornment>
                    }}
                  />
                </div>
              </div>
              <div className='py-3 flex justify-between items-center gap-5'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Tầm nhìn</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='vision'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={eye}
                    onChange={(e) => setEye(e.target.value)}
                    placeholder='Nhập tầm nhìn (x/10)'
                  />
                </div>
              </div>
              <div className='py-3 flex justify-between items-center gap-5'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Thính giác</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='hearing'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={hearing}
                    onChange={(e) => setHearing(e.target.value)}
                    placeholder='Ghi chú thính giác'
                  />
                </div>
              </div>
              <div className='py-3 flex justify-between items-center gap-5'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Răng</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='dental'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={dentalHealth}
                    onChange={(e) => setDentalHealth(e.target.value)}
                    placeholder='Ghi chú răng'
                  />
                </div>
              </div>
              <div className='py-3 flex justify-between items-center gap-5'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Dị ứng</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='allergy'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={allergy}
                    onChange={(e) => setAllergy(e.target.value)}
                    placeholder='Ghi chú dị ứng'
                  />
                </div>
              </div>
              <div className='py-3 flex justify-between items-center gap-5'>
                <dt className='text-base font-medium text-gray-500 px-4 '>Ghi chú</dt>
                <div className='flex gap-4 justify-between mr-4'>
                  <TextField
                    name='note'
                    multiline
                    type='text'
                    sx={{ width: '340px' }}
                    size='small'
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder='Ghi chú'
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

export default AddHealthRecord
