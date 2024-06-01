import { UsageHistoryType } from '@/@types/usageHistory'
import { formatDateTime } from '@/helpers/formatDateTime'
import { Button } from '@mui/material'
interface PropsType {
  usageHistory: UsageHistoryType
  onShowDetails: (history: UsageHistoryType) => void
}
const HealthRecordItem: React.FC<PropsType> = ({ usageHistory, onShowDetails }) => {
  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {usageHistory.id}
      </th>
      <td className='px-6 py-4'>{usageHistory.studentName}</td>
      <td className='px-6 py-4'>{usageHistory.classStudent}</td>
      <td className='px-6 py-4'>{formatDateTime(usageHistory.usageDate)}</td>
      <td className='px-6 py-4'>{usageHistory.reason}</td>
      <td className='px-6 py-4'>
        <Button color='primary' size='small' onClick={() => onShowDetails(usageHistory)}>
          Xem chi tiết
        </Button>
      </td>
    </tr>
  )
}

export default HealthRecordItem
