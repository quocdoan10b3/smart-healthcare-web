import { NotificationType } from '@/@types/notification'
import { formatDateTime } from '@/helpers/formatDateTime'
import { deleteNewsApi, getListNewsApi } from '@/services/FeedbackService/feedbackService'
import { RootState } from '@/store'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Pagination,
  TextField
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const navigate = useNavigate()
  const role = useSelector((state: RootState) => state.auth.role)
  const [search, setSearch] = useState<string>('')
  const [listNews, setListNews] = useState<NotificationType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string)
  }
  useEffect(() => {
    getListNews(currentPage, search)
  }, [currentPage, search])
  const getListNews = async (currentPage: number, search: string) => {
    try {
      const response = await getListNewsApi(currentPage, search)
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages)
        setListNews(response.data.items)
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
  const handleAddNews = () => {
    if (role && role?.toUpperCase() === 'ADMIN') navigate('/admin-add-news')
    else navigate('/staff-add-news')
  }
  const [open, setOpen] = useState(false)
  const [newsIdToDelete, setNewsIdToDelete] = useState<number | null>(null)

  const handleClickOpen = (id: number) => {
    setNewsIdToDelete(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = async () => {
    console.log('newsIdToDelete:', listNews)
    console.log('newsIdToDelete:', newsIdToDelete)
    if (newsIdToDelete !== null) {
      try {
        await deleteNewsApi(newsIdToDelete)
        toast.success('Tin tức đã được xóa thành công')
        getListNews(currentPage, search)
        handleClose()
      } catch (error) {
        console.error('Lỗi khi xóa tin tức:', error)
      }
    }
  }
  return (
    <div className='p-4'>
      <Box mb='20px'>
        <p className='font-semibold text-xl uppercase text-[#5e40ac]'>CHÀO MỪNG BẠN ĐẾN VỚI TRANG WEB</p>
      </Box>
      <div className=''>
        <div className='flex justify-between items-center'>
          <h2 className='text-cyan-600 text-lg'>Tin tức</h2>
          <div className='items-center'>
            {role && ['ADMIN'].includes(role.toUpperCase()) && (
              <Button
                variant='contained'
                onClick={handleAddNews}
                sx={{ background: '#068124', marginRight: 3, marginTop: '2px' }}
              >
                Thêm tin tức
              </Button>
            )}
            <TextField
              label='Tìm kiếm'
              variant='outlined'
              value={search}
              onChange={handleSearchChange}
              size='small'
              className=''
            />
          </div>
        </div>
        <div>
          {listNews.length > 0 &&
            listNews.map((news) => (
              <div className='inline-flex gap-5 mt-5'>
                <div>
                  <img
                    alt='Avatar của thuốc'
                    src={news.image || 'https://minio.whitemage.fun/healthcare/virus.jpg'}
                    width={200}
                    height={200}
                    style={{ borderRadius: '10%' }}
                  />
                </div>
                <div className='w-3/4 flex flex-col justify-between min-h-full'>
                  <div>
                    <div className='flex justify-between items-center'>
                      <h2 className='font-medium uppercase'>{news.title}</h2>
                      {role && ['ADMIN'].includes(role.toUpperCase()) && (
                        <IconButton onClick={() => handleClickOpen(news.id)} color='error'>
                          <DeleteForeverOutlinedIcon />
                        </IconButton>
                      )}
                    </div>
                    <p className='mx-auto mt-1 font-light'>{news.content}</p>
                  </div>
                  <p className='mt-auto font-light text-right mr-5 text-sm'>
                    <em>Ngày đăng: {formatDateTime(news.dateCreatAt)}</em>
                  </p>
                </div>
              </div>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa tin tức</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn khi xóa tin tức này?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Hủy
          </Button>
          <Button onClick={handleDelete} color='primary' autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Dashboard
