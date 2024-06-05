import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { formatDateTime } from '@/helpers/formatDateTime'
import { RootState } from '@/store'
import { Pagination, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import { UsageHistoryType } from '@/@types/usageHistory'
import { getUsageHistoryByUserIdApi } from '@/services/HistoryService/usageHistoryService'

const StudentMedicinesUsageHistory = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [search, setSearch] = useState<string>('')
  const [listUsageHistories, setListUsageHistories] = useState<UsageHistoryType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string)
  }
  useEffect(() => {
    const getUsageHistoryStudentById = async (id: number, currentPage: number, search: string) => {
      try {
        const response = await getUsageHistoryByUserIdApi(id, currentPage, search)
        if (response && response.status === 200) {
          setTotalPages(response.data.totalPages)
          console.log('response:', response.data.items)
          setListUsageHistories(response.data.items)
        }
      } catch (error) {
        console.error('Nhận thông tin lịch sử sử dụng thất bại:', error)
      }
    }
    if (user?.id) {
      getUsageHistoryStudentById(Number(user?.id), currentPage, search)
    }
  }, [user?.id, currentPage, search])
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  return (
    <div className='p-4'>
      <HeaderAdmin title='Lịch sử dùng thuốc của học sinh' />
      <div className='flex justify-end'>
        <TextField
          size='small'
          label='Tìm kiếm'
          variant='outlined'
          value={search}
          onChange={handleSearchChange}
          sx={{ width: 300, background: 'white', ml: 'auto', my: 2 }}
        />
      </div>
      {listUsageHistories.length > 0 ? (
        <div className='grid grid-cols-1'>
          <div className='grid grid-cols-2 gap-10'>
            {listUsageHistories.map((h) => (
              <div className='max-w-4xl p-8 bg-green-100 rounded-lg shadow-lg mt-1'>
                <div className='mb-8'>
                  <p className='text-cyan-600 text-2xl mb-5 text-center'>Đơn thuốc</p>
                </div>
                <div className='mb-4'>
                  <div className='w-1/2 pr-4 m-1'>
                    <h2 className='text-lg font-semibold mb-4'>Thông tin học sinh</h2>
                    <p className='mb-1'>
                      <em>Họ Tên: </em>
                      <span className='font-semibold ml-3'>{h?.studentName}</span>
                    </p>
                    <p className='mb-1'>
                      <em>Mã số học sinh: </em>
                      <span className='font-semibold ml-3'>{h?.studentCode}</span>
                    </p>
                    <p className='mb-1'>
                      <em>Ngày sử dụng: </em>
                      <span className='font-semibold ml-3'>{formatDateTime(h?.usageDate)}</span>
                    </p>
                    <p className='mb-1'>
                      <em>Lý do: </em>
                      <span className='font-semibold ml-3'>{h?.reason}</span>
                    </p>
                  </div>
                  <div className='w-1/2 pr-4 mt-5'>
                    <h2 className='text-lg font-semibold mb-1'>Đơn thuốc</h2>
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
                        {h?.prescriptionResponses.map((prescription, index) => (
                          <tr key={prescription.medicineId} className='bg-sky-300 border-b'>
                            <td className='px-6 py-4'>{index + 1}</td>
                            <td className='px-6 py-4'>{prescription.nameMedicine}</td>
                            <td className='px-6 py-4'>{prescription.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='py-4 px-4 flex justify-end'>
            <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
          </div>
        </div>
      ) : (
        <div className='px-5 md:px-10 items-center text-center'>
          <div className='mx-auto w-full max-w-7xl'>
            <div className='py-12'>
              <div className='grid grid-cols-1 md:grid-cols-1 gap-12 items-center'>
                <div className='py-8'>
                  <h1 className='font-bold text-cyan-700 mb-8 text-2xl text-center'>
                    Bạn chưa tham gia khám sức khỏe của trường
                    <SentimentVeryDissatisfiedIcon />
                  </h1>
                  <p className='text-center text-cyan-700'>Hãy đi khám sức khỏe cá nhân!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentMedicinesUsageHistory
