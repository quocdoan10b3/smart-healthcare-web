import { RootState } from '@/store'
import { Alert, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ImageNotPermission from '@/assets/images/not-permission.png'
import LoginIcon from '@mui/icons-material/Login'
import StudentSidebar from '@/components/Student/SideBar'
import Topbar from '@/components/Admin/TopBar'
const StudentLayout = () => {
  const role = useSelector((state: RootState) => state.auth.role)
  console.log(role)
  const navigate = useNavigate()
  return (
    <div>
      {role?.toUpperCase() === 'STUDENT' ? (
        <div className='flex relative h-full bg-[#f4efff]' style={{ minHeight: '100vh' }}>
          <StudentSidebar />
          <main className='h-full w-full bg-[#f4efff]' style={{ marginLeft: '270px', transition: 'margin-left 0.3s' }}>
            <Topbar />
            <Outlet />
          </main>
        </div>
      ) : (
        <div className='px-5 md:px-10 pb-5 md:pb-0 bg-gradient bg-no-repeat mt-24'>
          <div className='mx-auto w-full max-w-7xl'>
            <div className='pt-10'>
              <div className='grid items-center max-[991px]:justify-items-start grid-cols-1 md:grid-cols-2 gap-8 '>
                <div className=''>
                  <h1 className='font-bold text-cyan-700 mb-12 text-4xl md:text-4xl text-center'>
                    Bạn không có quyền truy cập liên kết này 👘
                  </h1>
                  <Alert sx={{ mb: 4 }} severity='error'>
                    Bạn vừa truy cập vào liên kết dành cho học sinh !
                  </Alert>
                  <Alert sx={{ mb: 4 }} severity='success'>
                    Quay lại và trải nghiệm ứng dụng !
                  </Alert>
                  <Button
                    sx={{ height: '60px', mb: 4 }}
                    fullWidth
                    variant='outlined'
                    size='large'
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                  >
                    Trở về trang trước
                  </Button>
                  <Button
                    sx={{ height: '60px' }}
                    fullWidth
                    variant='outlined'
                    size='large'
                    startIcon={<LoginIcon />}
                    onClick={() => navigate('/')}
                  >
                    Đăng nhập lại
                  </Button>
                </div>
                <div className='max-[991px]:mx-auto max-[991px]:max-w-[720px]'>
                  <img src={ImageNotPermission} alt='not-permission' className='inline-block max-w-full rounded-lg' />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentLayout
