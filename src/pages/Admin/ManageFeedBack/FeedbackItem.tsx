import { FeedbackType } from '@/@types/feedback'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material'
import ImageUserDefault from '@/assets/images/avatar-user.jpg'
import { formatDateTime } from '@/helpers/formatDateTime'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined'
import { useState } from 'react'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { addResponseApi, deleteFeedBackApi } from '@/services/FeedbackService/feedbackService'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
interface PropsType {
  feedback: FeedbackType
  refreshFeedbacks: () => void
}
const FeedbackItem = ({ feedback, refreshFeedbacks }: PropsType) => {
  const role = useSelector((state: RootState) => state.auth.role)
  const [response, setResponse] = useState('')
  const [isReplying, setIsReplying] = useState(false)

  const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(event.target.value)
  }
  const handleReplyClick = () => {
    setIsReplying(true)
  }
  const handleCancelClick = () => {
    setIsReplying(false)
    setResponse('')
  }
  const handleResponseSend = async () => {
    try {
      const res = await addResponseApi({ response }, feedback.id)
      if (res && res.status === 200) {
        toast.success('Thêm phản hồi thành công')
        console.log('Phản hồi đã được gửi:', response)
        refreshFeedbacks()
        setResponse('')
        setIsReplying(false)
      }
    } catch (error) {
      console.error('Lỗi khi gửi phản hồi:', error)
    }
  }
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = async () => {
    try {
      await deleteFeedBackApi(feedback.id)
      toast.success('Phản hồi đã được xóa thành công')
      refreshFeedbacks()
      handleClose()
    } catch (error) {
      console.error('Lỗi khi xóa phản hồi:', error)
    }
  }
  return (
    <>
      <div className='border p-4 rounded shadow mt-10 bg-orange-100'>
        <Box display='flex' alignItems='center'>
          <img
            alt='profile-user'
            width={50}
            height={50}
            src={feedback?.avatarUrl || ImageUserDefault}
            style={{ cursor: 'pointer', borderRadius: '50%' }}
          />
          <p className='pt-2 font-medium ml-1 text-center mb-1 text-lg'>{feedback.studentName}</p>
        </Box>
        {role && ['ADMIN'].includes(role.toUpperCase()) && (
          <IconButton onClick={handleClickOpen} color='error'>
            <DeleteForeverOutlinedIcon />
          </IconButton>
        )}
        <div className='ml-4'>
          <p className='font-thin text-sm'>
            <em>{formatDateTime(feedback.commentDate)}</em>
          </p>
          <div className='mt-4 shadow rounded p-2 border'>
            <p className='font-normal '>
              <CommentOutlinedIcon /> {feedback.comments}
            </p>
          </div>
          <div className='mt-2 ml-10'>
            {!feedback.response && role && ['ADMIN', 'STAFF'].includes(role.toUpperCase()) && (
              <Box display='flex' alignItems='center'>
                <button onClick={handleReplyClick} className='text-blue-500 mb-1'>
                  Trả lời
                </button>
                {isReplying && (
                  <button onClick={handleCancelClick} color='error' className='ml-5 mb-1'>
                    Hủy
                  </button>
                )}
              </Box>
            )}
            {isReplying && (
              <div>
                <TextField
                  label='Nhập phản hồi của bạn'
                  variant='outlined'
                  fullWidth
                  value={response}
                  onChange={handleResponseChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleResponseSend} color='primary'>
                        <SendOutlinedIcon />
                      </IconButton>
                    )
                  }}
                />
              </div>
            )}
            {feedback.response && (
              <p>
                <RedoOutlinedIcon /> {feedback.response}
              </p>
            )}
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận cập nhật</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn khi xóa câu hỏi đánh giá này?</DialogContentText>
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
    </>
  )
}

export default FeedbackItem
