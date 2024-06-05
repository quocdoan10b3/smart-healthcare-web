import { HealthInsuranceType } from '@/@types/healthInsurance'
import { formatDateTime } from '@/helpers/formatDateTime'
import { getInsuranceStudentByUserIdApi } from '@/services/HealthInsuranceService/healthInsuranceService'
import { RootState } from '@/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
const StudentHealthInsurance = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [listHealthInsurances, setListHealthInsurances] = useState<HealthInsuranceType[]>([])
  useEffect(() => {
    const getInsuranceStudentById = async (id: number) => {
      try {
        const response = await getInsuranceStudentByUserIdApi(id)
        if (response && response.status === 200) {
          setListHealthInsurances(response.data)
          console.log('listHealthInsurances:', listHealthInsurances[0])
        }
      } catch (error) {
        console.error('Error fetching information personal:', error)
      }
    }
    if (user?.id) {
      getInsuranceStudentById(Number(user?.id))
    }
  }, [user?.id])
  return (
    <div className='p-4'>
      <HeaderAdmin title='Danh sách bảo hiêm y tế cá nhân' />
      {listHealthInsurances.length > 0 ? (
        <div className='max-w-4xl mx-auto p-8 bg-green-100 rounded-lg shadow-lg mt-10'>
          <div className='text-center mb-8'>
            <p className='text-cyan-600 text-3xl text-center mb-5'>Bảo hiểm y tế học sinh</p>
          </div>
          <div className='flex justify-between'>
            <div className='w-1/2 pr-4 m-1'>
              <h2 className='text-lg font-semibold mb-4'>Thông tin học sinh</h2>
              <p className='mb-1'>
                <em>Họ Tên: </em>
                <span className='font-semibold ml-3'>{listHealthInsurances[0]?.studentName}</span>
              </p>
              <p className='mb-1'>
                <em>Số thẻ BHYT: </em>
                <span className='font-semibold ml-3'>{listHealthInsurances[0]?.insuranceNumber}</span>
              </p>
              <p className='mb-1'>
                <em>Ngày sinh: </em>
                <span className='font-semibold ml-3'>{formatDateTime(listHealthInsurances[0]?.dateOfBirth)}</span>
              </p>
              <p className='mb-1'>
                <em>Địa chỉ: </em>
                <span className='font-semibold ml-3'>{listHealthInsurances[0]?.address}</span>
              </p>
            </div>
            <div className='w-1/2 pl-4'>
              <h2 className='text-lg font-semibold mb-4'>Thông tin bảo hiểm y tế theo năm học</h2>
              <table className='w-full'>
                <thead>
                  <tr className=' text-gray-700 uppercase bg-gray-300 '>
                    <th className='border-b-2 border-gray-300 px-6' scope='col'>
                      STT
                    </th>
                    <th className='border-b-2 border-gray-300 px-6' scope='col'>
                      Năm học
                    </th>
                    <th className='border-b-2 border-gray-300 px-6' scope='col'>
                      Tình trạng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listHealthInsurances.map((hi, index) => (
                    <tr key={index} className='odd:bg-white even:bg-gray-50 border-b'>
                      <td className='border-b border-gray-300 px-7' scope='row'>
                        {index + 1}
                      </td>
                      <td className='border-b border-gray-300 px-7'>{hi.scholastic}</td>
                      <td className='border-b border-gray-300 px-7' style={{ color: hi.status ? 'inherit' : 'red' }}>
                        {hi.status ? 'Đã hoàn thành' : 'Chưa đóng'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className='px-5 md:px-10 items-center text-center'>
          <div className='mx-auto w-full max-w-7xl'>
            <div className='py-12'>
              <div className='grid grid-cols-1 md:grid-cols-1 gap-12 items-center'>
                <div className='py-8'>
                  <h1 className='font-bold text-cyan-700 mb-8 text-2xl text-center'>
                    Bạn chưa đăng ký bảo hiểm y tế ở trường <SentimentVeryDissatisfiedIcon />
                  </h1>
                  <p className='text-center text-cyan-700'>Hãy đăng ký bảo hiểm y tế!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentHealthInsurance
