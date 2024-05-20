import { StudentType } from '@/@types/student'
import { formatDateTime } from '@/helpers/formatDateTime'
interface PropsType {
  student: StudentType
}
const StudentItem = ({ student }: PropsType) => {
  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {student.id}
      </th>
      <td className='px-6 py-4'>{student.studentCode}</td>
      <td className='px-6 py-4'>{student.studentName}</td>
      <td className='px-6 py-4'>{student.class}</td>
      <td className='px-6 py-4'>{formatDateTime(student.date)}</td>
      <td className='px-6 py-4'>{student.gender ? 'Nam' : 'Nữ'}</td>
      <td className='px-6 py-4'>{student.address}</td>
    </tr>
  )
}

export default StudentItem
