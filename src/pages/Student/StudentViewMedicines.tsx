import { Pagination, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { MedicineType } from '@/@types/medicine'
import { getMedicinesApi } from '@/services/MedicineService/medicineService'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import MedicineItem from '../Admin/ManageMedicines/MedicineItem'
const StudentViewMedicines = () => {
  const [search, setSearch] = useState<string>('')
  const [listMedicines, setListMedicines] = useState<MedicineType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string)
  }
  useEffect(() => {
    getListMedicines(currentPage, search)
  }, [currentPage, search])
  const getListMedicines = async (currentPage: number, search: string) => {
    try {
      const response = await getMedicinesApi(currentPage, search, 10)
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages)
        setListMedicines(response.data.items)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const refreshMedicines = () => {
    getListMedicines(currentPage, search)
  }
  return (
    <div className='p-4'>
      <HeaderAdmin title='Kho thuốc của trường học' />
      <div className='flex justify-between'>
        {/* <Button
          variant='contained'
          onClick={() => navigate('/add-medicine')}
          sx={{ width: 200, background: '#068124', my: 2 }}
        >
          Thêm thuốc khác
        </Button> */}
        <TextField
          size='small'
          label='Tìm kiếm'
          variant='outlined'
          value={search}
          onChange={handleSearchChange}
          sx={{ width: 300, background: 'white', ml: 'auto', my: 2 }}
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-6 mt-5'>
        {listMedicines.map((medicine) => (
          <MedicineItem medicine={medicine} refreshMedicines={refreshMedicines} />
        ))}
      </div>
      <div className='py-6'>
        <Pagination
          color='primary'
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ width: '100%', mx: 'auto' }}
        />
      </div>
    </div>
  )
}

export default StudentViewMedicines
