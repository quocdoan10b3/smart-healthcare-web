import { HealthInsuranceType } from '@/@types/healthInsurance'
import { getAllHealthInsurancesApi } from '@/services/HealthInsuranceService/healthInsuranceService'
import { FormControl, InputLabel, MenuItem, Pagination, TextField } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ChangeEvent, useEffect, useState } from 'react'
import HealthInsuranceItem from './HealthInsuranceItem'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'

const AdminManageHealthInsurances = () => {
  const [scholastic, setScholastic] = useState<string>('None')
  const [status, setStatus] = useState<string>('All')
  const [search, setSearch] = useState<string>('')
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string)
  }
  const handleChangeScholastic = (event: SelectChangeEvent) => {
    setScholastic(event.target.value as string)
  }
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string)
  }
  console.log('search:', search)

  console.log('status:', status)
  const [listHealthInsurances, setListHealthInsurances] = useState<HealthInsuranceType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  useEffect(() => {
    getListHealthInsurances(currentPage, status, scholastic, search)
  }, [currentPage, status, scholastic, search])
  const getListHealthInsurances = async (currentPage: number, status: string, scholastic: string, search: string) => {
    try {
      const response = await getAllHealthInsurancesApi(currentPage, status, scholastic, search)
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages)
        setListHealthInsurances(response.data.items)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  const refreshInsurances = () => {
    getListHealthInsurances(currentPage, status, scholastic, search)
  }
  console.log(listHealthInsurances)
  return (
    <div className='p-4 '>
      <HeaderAdmin title='Quản lý danh sách bảo hiêm y tế học sinh' />
      <div className='flex justify-between'>
        <FormControl size='small' sx={{ width: 200, my: 2, background: 'white' }}>
          <InputLabel id='demo-simple-select-label'>Năm học</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={scholastic}
            label='Năm học'
            onChange={handleChangeScholastic}
          >
            <MenuItem value='None'>Tất cả</MenuItem>
            <MenuItem value='N2024_2025'>2024-2025</MenuItem>
            <MenuItem value='N2023_2024'>2023-2024</MenuItem>
            <MenuItem value='N2022_2023'>2022-2023</MenuItem>
            <MenuItem value='N2021_2022'>2021-2022</MenuItem>
            <MenuItem value='N2020_2021'>2020-2021</MenuItem>
          </Select>
        </FormControl>
        <FormControl size='small' sx={{ width: 200, my: 2, background: 'white', ml: 2 }}>
          <InputLabel id='demo-simple-select-label'>Trạng thái</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={status}
            label='Trạng thái'
            onChange={handleChange}
          >
            <MenuItem value='All'>Tất cả</MenuItem>
            <MenuItem value='True'>Đã hoàn thành</MenuItem>
            <MenuItem value='False'>Chứa đóng</MenuItem>
          </Select>
        </FormControl>
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
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Tên học sinh
              </th>
              <th scope='col' className='px-6 py-3'>
                Mã số bảo hiểm y tế
              </th>
              <th scope='col' className='px-6 py-3'>
                Năm học
              </th>
              <th scope='col' className='px-6 py-3'>
                Tình trạng
              </th>
            </tr>
          </thead>
          <tbody>
            {listHealthInsurances.map((hi) => (
              <HealthInsuranceItem healthInsurance={hi} refreshInsurances={refreshInsurances} />
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

export default AdminManageHealthInsurances
