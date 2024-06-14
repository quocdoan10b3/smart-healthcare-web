import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { Pagination, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import HistoryImportItem from './HistoryImportItem'
import { ImportHistoryType } from '@/@types/medicine'
import { getAllImportMedicineApi } from '@/services/MedicineService/medicineService'

const AdminHistoryImport = () => {
  const [search, setSearch] = useState<string>('')
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string)
  }
  const [listImportHistories, setListImportHistories] = useState<ImportHistoryType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  useEffect(() => {
    getListImportHistories(currentPage, search)
  }, [currentPage, search])
  const getListImportHistories = async (currentPage: number, search: string) => {
    try {
      const response = await getAllImportMedicineApi(currentPage, search)
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages)
        setListImportHistories(response.data.items)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  return (
    <div className='p-4 '>
      <HeaderAdmin title='Lịch sử nhập thuốc' />
      <div className='flex justify-between'>
        <TextField
          size='small'
          label='Tìm kiếm'
          variant='outlined'
          value={search}
          onChange={handleSearchChange}
          sx={{ width: 300, background: 'white', ml: 'auto', my: 2 }}
        />
      </div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
            <tr>
              <th scope='col' className='px-6 py-3'>
                STT
              </th>
              <th scope='col' className='px-6 py-3'>
                Tên thuốc
              </th>
              <th scope='col' className='px-6 py-3'>
                Số lượng
              </th>
              <th scope='col' className='px-6 py-3'>
                Hạn sử dụng
              </th>
              <th scope='col' className='px-6 py-3'>
                Ngày nhập
              </th>
            </tr>
          </thead>
          <tbody>
            {listImportHistories.map((h, index) => (
              <HistoryImportItem key={index} indexNumber={index + 1} importHistory={h} />
            ))}
          </tbody>
        </table>
        <div className='py-4 px-4 flex justify-end'>
          <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
        </div>
      </div>
    </div>
  )
}

export default AdminHistoryImport
