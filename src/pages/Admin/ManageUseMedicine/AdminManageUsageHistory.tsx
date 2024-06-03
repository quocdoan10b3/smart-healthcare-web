import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { Button, Dialog, DialogActions, DialogContent, Pagination, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { formatDateTime } from '@/helpers/formatDateTime'
import { getAllUsageHistoriesApi } from '@/services/HistoryService/usageHistoryService'
import { UsageHistoryType } from '@/@types/usageHistory'
import UsageHistoryItem from './UsageHistoryItem'

const AdminManageUsageHistory = () => {
  const [search, setSearch] = useState<string>('')
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string)
  }
  const [listUsageHistories, setListUsageHistories] = useState<UsageHistoryType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [selectedHistory, setSelectedHistory] = useState<UsageHistoryType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  useEffect(() => {
    getListUsageHistories(currentPage, search)
  }, [currentPage, search])
  const getListUsageHistories = async (currentPage: number, search: string) => {
    try {
      const response = await getAllUsageHistoriesApi(currentPage, search)
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages)
        setListUsageHistories(response.data.items)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  const handleOpenDialog = (history: UsageHistoryType) => {
    setSelectedHistory(history)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedHistory(null)
  }
  return (
    <div className='p-4 '>
      <HeaderAdmin title='Lịch sử dùng thuốc của học sinh' />
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
                Tên học sinh
              </th>
              <th scope='col' className='px-6 py-3'>
                Lớp
              </th>
              <th scope='col' className='px-6 py-3'>
                Ngày sử dụng
              </th>
              <th scope='col' className='px-6 py-3'>
                Lý do
              </th>
              <th scope='col' className='px-6 py-3'>
                Đơn thuốc
              </th>
            </tr>
          </thead>
          <tbody>
            {listUsageHistories.map((h, index) => (
              <UsageHistoryItem key={index} indexNumber={index + 1} usageHistory={h} onShowDetails={handleOpenDialog} />
            ))}
          </tbody>
        </table>
        <div className='py-4 px-4 flex justify-end'>
          <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
        </div>
      </div>
      {selectedHistory && (
        <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth='xs' fullWidth>
          <DialogActions>
            <Button onClick={handleCloseDialog} color='primary'>
              Đóng
            </Button>
          </DialogActions>
          <h3 className='text-cyan-800 font-semibold text-xl uppercase text-center'>ĐƠN THUỐC CỦA HỌC SINH</h3>
          <DialogContent>
            <div className='items-center m-2'>
              <p className='text-gray-700 min-w-[120px] p-1'>
                <strong>Họ tên:</strong> {selectedHistory.studentName}
              </p>
              <p className='text-gray-700 min-w-[120px] p-1'>
                <strong>Lớp:</strong> {selectedHistory.classStudent}
              </p>
              <p className='text-gray-700 min-w-[120px] p-1'>
                <strong>Ngày sử dụng: </strong> {formatDateTime(selectedHistory.usageDate)}
              </p>
              <p className='text-gray-700 min-w-[120px] p-1'>
                <strong>Lý do: </strong> {selectedHistory.reason}
              </p>
              <p className='text-gray-700 min-w-[120px] p-1'>
                <strong>Đơn thuốc:</strong>
              </p>
              <table className='min-w-full text-sm text-left rtl:text-right text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-lime-600'>
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
                  </tr>
                </thead>
                <tbody>
                  {selectedHistory.prescriptionResponses.map((prescription, index) => (
                    <tr key={prescription.medicineId} className='bg-sky-300 border-b'>
                      <td className='px-6 py-4'>{index + 1}</td>
                      <td className='px-6 py-4'>{prescription.nameMedicine}</td>
                      <td className='px-6 py-4'>{prescription.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default AdminManageUsageHistory
