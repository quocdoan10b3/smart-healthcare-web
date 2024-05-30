import { FeedbackType } from '@/@types/feedback'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { getAllFeedbacksApi } from '@/services/FeedbackService/feedbackService'
import { Pagination } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import FeedbackItem from './FeedbackItem'

const AdminManageFeedBack = () => {
  const [search, setSearch] = useState<string>('')
  const [listFeedbacks, setListFeedbacks] = useState<FeedbackType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string)
  }
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
      {/* <div className='border p-4 rounded shadow'>
        <ul className=''>
          {listFeedbacks.map((item) => (
            <li key={item.id} className=''>
              <div className='border p-4 rounded shadow'>
                <Avatar alt={item.student} src={item.avatar} className='mr-4' />
                <p className='text-xl font-semibold'>{item.studentName}</p>
              </div>
              {formatDateTime(item.commentDate)}
              <div className='mb-4 border p-4 rounded shadow'>
                <p>{item.comments}</p>
              </div>

              {item.response && (
                <div className='mt-4 border p-4 rounded shadow'>
                  <p className='font-bold'>Admin Response:</p>
                  <p>{item.response}</p>
                  <p>{formatDateTime(item.responseDate)}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div> */}
      <div>
        {listFeedbacks.map((fb) => (
          <FeedbackItem feedback={fb} refreshFeedbacks={refreshFeedbacks}/>
        ))}
      </div>
      <div className='py-4 px-4 flex justify-end'>
        <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
      </div>
    </div>
  )
}

export default AdminManageFeedBack
