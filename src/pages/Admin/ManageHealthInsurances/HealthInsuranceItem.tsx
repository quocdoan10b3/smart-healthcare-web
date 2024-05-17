import { HealthInsuranceType } from '@/@types/healthInsurance'
import { formatDateTime } from '@/helpers/formatDateTime'
interface PropsType {
  healthInsurance: HealthInsuranceType
  //   getListHealthInsurances: (currentPage: number, status: string, search: string) => Promise<void>
  //   status: string
  //   currentPage: number
}
const HealthInsuranceItem = ({ healthInsurance }: PropsType) => {
  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {healthInsurance.id}
      </th>
      <td className='px-6 py-4'>{healthInsurance.studentName}</td>
      <td className='px-6 py-4'>{healthInsurance.insuranceNumber}</td>
      <td className='px-6 py-4'>{formatDateTime(healthInsurance.expDate)}</td>
      <td className='px-6 py-4'>{healthInsurance.status ? 'Đã hoàn thành' : 'Chưa đóng'}</td>
    </tr>
  )
}

export default HealthInsuranceItem
