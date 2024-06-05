import { AddCommentsType, FeedbackType } from '@/@types/feedback'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { addCommentsStudentApi, getAllFeedbacksApi } from '@/services/FeedbackService/feedbackService'
import { Button, Pagination, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import FeedbackItem from '../Admin/ManageFeedBack/FeedbackItem'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const StudentFeedBack = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [search, setSearch] = useState<string>('')
  const [listFeedbacks, setListFeedbacks] = useState<FeedbackType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [newFeedback, setNewFeedback] = useState<string>('')

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
  const handleNewFeedbackChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewFeedback(event.target.value)
  }

  const handleSubmitFeedback = async () => {
    const body: AddCommentsType = {
      rating: 0,
      comments: newFeedback
    }
    try {
      if (user) {
        const response = await addCommentsStudentApi(body, user?.id)
        if (response && response.status === 200) {
          setNewFeedback('')
          refreshFeedbacks()
          toast.success('Tạo câu hỏi và phản hồi thành công !')
        }
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    }
  }
  return (
    <div className='p-4'>
      <HeaderAdmin title='Đánh giá và hỗ trợ trực tuyến' />
      <div className='mb-4'>
        <TextField
          size='small'
          multiline
          label='Tạo câu hỏi'
          variant='outlined'
          value={newFeedback}
          onChange={handleNewFeedbackChange}
          sx={{ width: '100%', mb: 2 }}
        />
        <Button variant='contained' color='primary' onClick={handleSubmitFeedback}>
          Gửi phản hồi
        </Button>
      </div>
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

export default StudentFeedBack
