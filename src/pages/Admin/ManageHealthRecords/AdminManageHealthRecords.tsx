import { HealthRecordType } from '@/@types/healthRecord'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { getAllHealthRecordsApi, getAllScholasticsHR } from '@/services/HealthRecordService/healthRecordService'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import HealthRecordItem from './HealthRecordItem'
import { formatDateTime } from '@/helpers/formatDateTime'

const AdminManageHealthRecords = () => {
  const [scholastic, setScholastic] = useState<string>('None')
  const [search, setSearch] = useState<string>('')
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string)
  }
  const handleChangeScholastic = (event: SelectChangeEvent) => {
    setScholastic(event.target.value as string)
  }
  const [listHealthRecords, setListHealthRecords] = useState<HealthRecordType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [selectedRecord, setSelectedRecord] = useState<HealthRecordType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [listScholastic, setListScholastic] = useState<string[]>([])
  useEffect(() => {
    getListHealthRecords(currentPage, scholastic, search)
  }, [currentPage, scholastic, search])
  const getListHealthRecords = async (currentPage: number, scholastic: string, search: string) => {
    try {
      const response = await getAllHealthRecordsApi(currentPage, scholastic, search)
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages)
        setListHealthRecords(response.data.items)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getListScholastic()
  }, [])
  const getListScholastic = async () => {
    try {
      const response = await getAllScholasticsHR()
      if (response && response.status === 200) {
        setListScholastic(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  const handleOpenDialog = (record: HealthRecordType) => {
    setSelectedRecord(record)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedRecord(null)
  }
  return (
    <div className='p-4 '>
      <HeaderAdmin title='Quản lý hồ sơ khám sức khỏe học sinh' />
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
            {/* <MenuItem value='None'>Tất cả</MenuItem>
            <MenuItem value='N2024_2025'>2024-2025</MenuItem>
            <MenuItem value='N2023_2024'>2023-2024</MenuItem>
            <MenuItem value='N2022_2023'>2022-2023</MenuItem>
            <MenuItem value='N2021_2022'>2021-2022</MenuItem>
            <MenuItem value='N2020_2021'>2020-2021</MenuItem> */}
            <MenuItem value='None'>Tất cả</MenuItem>
            {listScholastic.map((scholastic) => (
              <MenuItem key={scholastic} value={`N${scholastic.replace('-', '_')}`}>
                {scholastic}
              </MenuItem>
            ))}
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
                Ngày khám
              </th>
              <th scope='col' className='px-6 py-3 w-[120px]'>
                Chiều cao
              </th>
              <th scope='col' className='px-6 py-3 w-[120px]'>
                Cân nặng
              </th>
              <th scope='col' className='px-6 py-3 w-[120px]'>
                Tầm nhìn
              </th>
              {/* <th scope='col' className='px-6 py-3 w-[250px]'>
                Tai
              </th>
              <th scope='col' className='px-6 py-3 w-[250px]'>
                Răng
              </th>
              <th scope='col' className='px-6 py-3 w-[250px]'>
                Dị ứng
              </th> */}
              <th scope='col' className='px-6 py-3'>
                Chú ý
              </th>
              <th scope='col' className='px-6 py-3 w-[140px]'>
                Lựa chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {listHealthRecords.map((hr) => (
              <HealthRecordItem healthRecord={hr} onShowDetails={handleOpenDialog} />
            ))}
          </tbody>
        </table>
        <div className='py-4 px-4 flex justify-end'>
          <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
        </div>
      </div>
      {selectedRecord && (
        <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth='xs' fullWidth>
          <DialogActions>
            <Button onClick={handleCloseDialog} color='primary'>
              Đóng
            </Button>
          </DialogActions>
          <h3 className='text-cyan-800 font-medium uppercase text-center'>HỒ SƠ KHÁM BỆNH</h3>
          <DialogContent>
            <div className='items-center m-2'>
              <p className='text-gray-700 min-w-[120px]'>
                <strong>Họ tên:</strong> {selectedRecord.studentName}
              </p>
              <p className='text-gray-700 min-w-[120px]'>
                <strong>Ngày khám: </strong> {formatDateTime(selectedRecord.examDate)}
              </p>
              <p className='text-gray-700 min-w-[120px]'>
                <strong>Chiều cao:</strong> {selectedRecord.height} cm
              </p>
              <p className='text-gray-700 min-w-[120px]'>
                <strong>Cân nặng:</strong> {selectedRecord.weight} kg
              </p>
              <p className='text-gray-700 min-w-[120px]'>
                <strong>Tầm nhìn: </strong> {selectedRecord.vision} / 10
              </p>
              <p className='text-gray-700 min-w-[120px]'>
                <strong>Tai:</strong> {selectedRecord.hearing}
              </p>
              <p className='text-gray-700 min-w-[120px]'>
                <strong>Răng: </strong> {selectedRecord.dentalHealth}
              </p>
              <p className='text-gray-700 min-w-[120px]'>
                <strong>Dị ứng:</strong> {selectedRecord.allergies}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default AdminManageHealthRecords
