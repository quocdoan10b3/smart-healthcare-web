import { ImportHistoryType } from '@/@types/medicine'
import { formatDateTime } from '@/helpers/formatDateTime'
interface PropsType {
  importHistory: ImportHistoryType
  indexNumber: number
}
const HistoryImportItem: React.FC<PropsType> = ({ importHistory, indexNumber }) => {
  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {indexNumber}
      </th>
      <td className='px-6 py-4'>{importHistory.medicineName}</td>
      <td className='px-6 py-4'>{importHistory.quantity}</td>
      <td className='px-6 py-4'>{formatDateTime(importHistory.expDate)}</td>
      <td className='px-6 py-4'>{formatDateTime(importHistory.importDate)}</td>
    </tr>
  )
}

export default HistoryImportItem
