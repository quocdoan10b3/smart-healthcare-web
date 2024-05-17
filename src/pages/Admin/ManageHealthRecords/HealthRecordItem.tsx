import { HealthRecordType } from '@/@types/healthRecord'
import { formatDateTime } from '@/helpers/formatDateTime'
import { Button } from '@mui/material'
interface PropsType {
  healthRecord: HealthRecordType
  onShowDetails: (record: HealthRecordType) => void
}
const HealthRecordItem: React.FC<PropsType> = ({ healthRecord, onShowDetails }) => {
  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {healthRecord.id}
      </th>
      <td className='px-6 py-4'>{healthRecord.studentName}</td>
      <td className='px-6 py-4'>{formatDateTime(healthRecord.examDate)}</td>
      <td className='px-6 py-4'>{healthRecord.height} cm</td>
      <td className='px-6 py-4'>{healthRecord.weight} kg</td>
      <td className='px-6 py-4'>{healthRecord.vision} / 10</td>
      {/* <td className='px-6 py-4'>{healthRecord.hearing}</td>
      <td className='px-6 py-4'>{healthRecord.dentalHealth}</td>
      <td className='px-6 py-4'>{healthRecord.allergies}</td> */}
      <td className='px-6 py-4'>{healthRecord.notes}</td>
      <td className='px-6 py-4'><Button variant='text' color='primary' onClick={() => onShowDetails(healthRecord)}>
        Xem thêm
        </Button>
      </td>
      {/* <td className='px-6 py-4'>{healthRecord.height}</td> */}
    </tr>
  )
}

export default HealthRecordItem
