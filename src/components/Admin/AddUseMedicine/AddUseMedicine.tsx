import HeaderAdmin from '../HeaderAdmin'
import { useLocation } from 'react-router-dom'
import { StudentType } from '@/@types/student'
import { ChangeEvent, useEffect, useState } from 'react'
import UseMedicine from '@/components/Admin/AddUseMedicine/UseMedicine'
import ListMedicine from '@/components/Admin/AddUseMedicine/ListMedicine'
import { getMedicinesApi } from '@/services/MedicineService/medicineService'
import { Pagination } from '@mui/material'
import { formatDateTime } from '@/helpers/formatDateTime'

export interface IMedicine {
  id: number
  name: string
  quantity: number
  effect: string
  imageMedicine: string
}
export interface IMedicineUse extends IMedicine {
  quantityShouldUse: number
}

const AddUseMedicine = () => {
  const location = useLocation()
  const { student } = location.state as { student: StudentType }
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const idStudent = student.id

  const [useMedicine, setUseMedicine] = useState<IMedicineUse[]>([])
  const [listMedicine, setListMedicine] = useState<IMedicine[]>([])

  const fetchMedicines = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await getMedicinesApi(currentPage, '', 6)
      setTotalPages(response.data.totalPages)
      setListMedicine(response.data.items)
    } catch (err) {
      throw err
    }
  }
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  useEffect(() => {
    fetchMedicines()
  }, [currentPage])
  console.log(student)
  return (
    <div className='p-4'>
      <HeaderAdmin title='Tạo đơn thuốc cho học sinh' />
      <div className='px-3 gap-2 mt-10'>
        <div className='flex gap-10 mb-1'>
          <p>
            <em>Họ tên:</em>
          </p>
          <p>{student.studentName}</p>
        </div>
        <div className='flex gap-16 mb-1'>
          <p>
            <em>Lớp:</em>
          </p>
          <p>{student.class}</p>
        </div>
        <div className='flex gap-3 mb-1'>
          <p>
            <em>Ngày sinh:</em>
          </p>
          <p>{formatDateTime(student.date)}</p>
        </div>

        <div className='grid grid-cols-2 gap-12'>
          <UseMedicine useMedicine={useMedicine} setUseMedicine={setUseMedicine} idStudent={idStudent} />
          <div className='-mt-28'>
            <ListMedicine listMedicine={listMedicine} setUseMedicine={setUseMedicine} />
            <div className='py-4 flex justify-end'>
              <Pagination
                color='primary'
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                sx={{ width: '100%', mx: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUseMedicine
