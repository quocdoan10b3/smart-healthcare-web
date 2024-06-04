import { HealthInsuranceType } from '@/@types/healthInsurance'
import { updateStatusInsuranceApi } from '@/services/HealthInsuranceService/healthInsuranceService'
import { Button } from '@mui/material'
import { confirmAlert } from 'react-confirm-alert'
interface PropsType {
  healthInsurance: HealthInsuranceType
  //   getListHealthInsurances: (currentPage: number, status: string, search: string) => Promise<void>
  //   status: string
  //   currentPage: number
  refreshInsurances: () => void
}
const HealthInsuranceItem = ({ healthInsurance, refreshInsurances }: PropsType) => {
  const handleUpdateStatus = () => {
    confirmAlert({
      title: 'Xác nhận cập nhật',
      message: 'Bạn có chắc chắn muốn cập nhật trạng thái bảo hiểm y tế này?',
      buttons: [
        {
          label: 'Xác nhận',
          onClick: async () => {
            const status = true
            await updateStatusInsuranceApi(healthInsurance.id, { status })
            refreshInsurances()
          }
        },
        {
          label: 'Hủy'
        }
      ]
    })
  }
  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {healthInsurance.id}
      </th>
      <td className='px-6 py-4'>{healthInsurance.studentName}</td>
      <td className='px-6 py-4'>{healthInsurance.insuranceNumber}</td>
      {/* <td className='px-6 py-4'>{formatDateTime(healthInsurance.expDate)}</td> */}
      <td className='px-6 py-4'>{healthInsurance.scholastic}</td>
      <td className='px-6 py-4'>
        {healthInsurance.status ? (
          'Đã hoàn thành'
        ) : (
          <Button className='' onClick={handleUpdateStatus} size='small' variant='contained'>
            Cập nhật
          </Button>
        )}
      </td>
    </tr>
  )
}

export default HealthInsuranceItem
