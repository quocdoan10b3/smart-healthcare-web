import { HealthRecordType } from '@/@types/healthRecord'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { formatDateTime } from '@/helpers/formatDateTime'
import {
  getAllScholasticsHRStudent,
  getHealthRecordStudentByUserIdApi
} from '@/services/HealthRecordService/healthRecordService'
import { RootState } from '@/store'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

const StudentHealthRecord = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [scholastic, setScholastic] = useState<string>('N2023_2024')
  const [listHealthRecords, setListHealthRecords] = useState<HealthRecordType[]>([])
  const [listScholastic, setListScholastic] = useState<string[]>([])

  const handleChangeScholastic = (event: SelectChangeEvent) => {
    setScholastic(event.target.value as string)
  }
  useEffect(() => {
    const getHealthRecordStudentById = async (id: number, scholastic: string) => {
      try {
        const response = await getHealthRecordStudentByUserIdApi(id, scholastic)
        if (response && response.status === 200) {
          setListHealthRecords(response.data)
        }
      } catch (error) {
        console.error('Error fetching information personal:', error)
      }
    }
    if (user?.id) {
      getHealthRecordStudentById(Number(user?.id), scholastic)
    }
  }, [user?.id, scholastic])
  useEffect(() => {
    if (user?.id) getListScholastic(Number(user?.id))
  }, [user?.id])
  const getListScholastic = async (userId: number) => {
    try {
      const response = await getAllScholasticsHRStudent(userId)
      if (response && response.status === 200) {
        setListScholastic(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='p-4'>
      <HeaderAdmin title='Danh sách hồ sơ khám sức khỏe cá nhân' />
      <FormControl size='small' sx={{ width: 200, my: 2, background: 'white' }}>
        <InputLabel id='demo-simple-select-label'>Năm học</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={scholastic}
          label='Năm học'
          onChange={handleChangeScholastic}
        >
          {/* <MenuItem value='None'>Tất cả</MenuItem>
          <MenuItem value='N2024_2025'>2024-2025</MenuItem>
          <MenuItem value='N2023_2024'>2023-2024</MenuItem>
          <MenuItem value='N2022_2023'>2022-2023</MenuItem>
          <MenuItem value='N2021_2022'>2021-2022</MenuItem>
          <MenuItem value='N2020_2021'>2020-2021</MenuItem> */}
          {/* <MenuItem value='None'>Tất cả</MenuItem> */}
          {listScholastic.map((scholastic) => (
            <MenuItem key={scholastic} value={`N${scholastic.replace('-', '_')}`}>
              {scholastic}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {listHealthRecords.length > 0 ? (
        <div className='max-w-4xl mx-auto p-8 bg-green-100 rounded-lg shadow-lg mt-1'>
          <div className='text-center mb-8'>
            <p className='text-cyan-600 text-3xl text-center mb-5'>Hồ sơ khám sức khỏe</p>
          </div>
          <div className='flex justify-between'>
            <div className='w-1/2 pr-4 m-1'>
              <h2 className='text-lg font-semibold mb-4'>Thông tin học sinh</h2>
              <p className='mb-1'>
                <em>Họ Tên: </em>
                <span className='font-semibold ml-3'>{listHealthRecords[0]?.studentName}</span>
              </p>
              <p className='mb-1'>
                <em>Ngày sinh: </em>
                <span className='font-semibold ml-3'>{formatDateTime(listHealthRecords[0]?.dateOfBirth)}</span>
              </p>
              <p className='mb-1'>
                <em>Ngày khám: </em>
                <span className='font-semibold ml-3'>{formatDateTime(listHealthRecords[0]?.examDate)}</span>
              </p>
              <p className='mb-1'>
                <em>Năm học: </em>
                <span className='font-semibold ml-3'>{listHealthRecords[0]?.scholastic}</span>
              </p>
            </div>
            <div className='w-1/2 pl-4'>
              <h2 className='text-lg font-semibold mb-4'>Số liệu khám sức khỏe</h2>
              <table className='w-full'>
                <thead>
                  <tr className=' text-gray-700 uppercase bg-gray-300 '>
                    <th className='border-b-2 border-gray-300 px-6' scope='col'>
                      Tên chức năng
                    </th>
                    <th className='border-b-2 border-gray-300 px-6' scope='col'>
                      Thông số
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='border-b border-gray-300 px-7'>Chiều cao</td>
                    <td className='border-b border-gray-300 px-7' scope='row'>
                      {listHealthRecords[0]?.height} cm
                    </td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='border-b border-gray-300 px-7'>Cân nặng</td>
                    <td className='border-b border-gray-300 px-7' scope='row'>
                      {listHealthRecords[0]?.weight} kg
                    </td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='border-b border-gray-300 px-7'>Mắt</td>
                    <td className='border-b border-gray-300 px-7' scope='row'>
                      {listHealthRecords[0]?.vision}/10
                    </td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='border-b border-gray-300 px-7'>Tai</td>
                    <td className='border-b border-gray-300 px-7' scope='row'>
                      {listHealthRecords[0]?.hearing}
                    </td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='border-b border-gray-300 px-7'>Răng</td>
                    <td className='border-b border-gray-300 px-7' scope='row'>
                      {listHealthRecords[0]?.dentalHealth}
                    </td>
                  </tr>
                  <tr className='odd:bg-white even:bg-gray-50 border-b'>
                    <td className='border-b border-gray-300 px-7'>Dị ứng</td>
                    <td className='border-b border-gray-300 px-7' scope='row'>
                      {listHealthRecords[0]?.allergies}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='text-right mt-8'>
            <h2 className='text-lg '>
              <span className='font-semibold'>Kết luận:</span> {listHealthRecords[0]?.notes}
            </h2>
          </div>
        </div>
      ) : (
        <div className='px-5 md:px-10 items-center text-center'>
          <div className='mx-auto w-full max-w-7xl'>
            <div className='py-12'>
              <div className='grid grid-cols-1 md:grid-cols-1 gap-12 items-center'>
                <div className='py-8'>
                  <h1 className='font-bold text-cyan-700 mb-8 text-2xl text-center'>
                    Bạn chưa tham gia khám sức khỏe của trường
                    <SentimentVeryDissatisfiedIcon />
                  </h1>
                  <p className='text-center text-cyan-700'>Hãy đi khám sức khỏe cá nhân!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentHealthRecord
