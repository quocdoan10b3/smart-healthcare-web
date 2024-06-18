import { FeedbackType } from '@/@types/feedback'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { getAllFeedbacksApi } from '@/services/FeedbackService/feedbackService'
import { Pagination } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import FeedbackItem from './FeedbackItem'

const AdminManageFeedBack = () => {
  const [search] = useState<string>('')
  const [listFeedbacks, setListFeedbacks] = useState<FeedbackType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(event.target.value as string)
  // }
  useEffect(() => {
    getListFeedbacks(currentPage, search)
  }, [currentPage, search])
  const getListFeedbacks = async (currentPage: number, search: string) => {
    try {
      const response = await getAllFeedbacksApi(currentPage, search)
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages)
        setListFeedbacks(response.data.items)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  const refreshFeedbacks = () => {
    getListFeedbacks(currentPage, search)
  }
  return (
    <div className='p-4'>
      <HeaderAdmin title='Đánh giá và hỗ trợ trực tuyến' />
      <div>
        {listFeedbacks.map((fb) => (
          <FeedbackItem feedback={fb} refreshFeedbacks={refreshFeedbacks} />
        ))}
      </div>
      <div className='py-4 px-4 flex justify-end mt-5'>
        <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
      </div>
    </div>
  )
}

export default AdminManageFeedBack
