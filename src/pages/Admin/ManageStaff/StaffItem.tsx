import { StaffType } from '@/@types/staff'
import { formatDateTime } from '@/helpers/formatDateTime'

interface PropsType {
  staff: StaffType
}
const StaffItem = ({ staff }: PropsType) => {
  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {staff.id}
      </th>
      <td className='px-6 py-4'>{staff.fullName}</td>
      <td className='px-6 py-4'>{formatDateTime(staff.date)}</td>
      <td className='px-6 py-4'>{staff.gender ? 'Nam' : 'Nữ'}</td>
      <td className='px-6 py-4'>{staff.address}</td>
    </tr>
  )
}

export default StaffItem
