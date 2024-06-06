import { ThemeProvider, createTheme } from '@mui/material'
import { Routes, Route, useNavigate } from 'react-router-dom'
import GuestRoute from './routes/guest-route'
import './index.css'
import Login from './components/Authenticate/Login'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import AuthenticationRoute from './routes/authenticate-route'
// import MainLayout from './layouts/StudentLayout/StudentLayout'
// import HomePage from './pages/HomePage'
import { useDispatch } from 'react-redux'
import { saveLogout, saveUserLogin } from './redux-toolkit/auth.slice'
import { UserType } from './@types/user'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import AdminManageHealthRecords from './pages/Admin/ManageHealthRecords/AdminManageHealthRecords'
import AdminManageHealthInsurances from './pages/Admin/ManageHealthInsurances/AdminManageHealthInsurances'
import AdminManageStudents from './pages/Admin/ManageStudents/AdminManageStudents'
import AdminManageMedicines from './pages/Admin/ManageMedicines/AdminManageMedicines'
import AdminManageUsageHistory from './pages/Admin/ManageUseMedicine/AdminManageUsageHistory'
import AdminStatic from './pages/Admin/Statistic/AdminStatic'
import AdminManageFeedBack from './pages/Admin/ManageFeedBack/AdminManageFeedBack'
import StudentLayout from './layouts/StudentLayout/StudentLayout'
import StudentHealthRecord from './pages/Student/StudentHealthRecord'
import StudentInfoPersonal from './pages/Student/StudentInfoPersonal'
import StudentViewMedicines from './pages/Student/StudentViewMedicines'
import StudentFeedBack from './pages/Student/StudentFeedBack'
import StudentHealthInsurance from './pages/Student/StudentHealthInsurance'
import StudentMedicinesUsageHistory from './pages/Student/StudentMedicinesUsageHistory'
import AddHealthRecord from './components/Admin/AddHealthRecord'
import AddHealthInsurance from './components/Admin/AddHealthInsurance'
import AddMedicineForm from './components/Admin/AddMedicineForm'
import AddUseMedicine from './components/Admin/AddUseMedicine/AddUseMedicine'
import { useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/http'
import StaffLayout from './layouts/StaffLayout/StaffLayout'
import AddNewsForm from './components/Admin/AddNewsForm'
function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = createTheme({
    typography: {
      fontFamily: 'Lexend'
    }
  })
  const userLocal = localStorage.getItem('user')
  const accessTokenLocal = localStorage.getItem('accessToken')
  const refreshTokenLocal = localStorage.getItem('refreshToken')
  const roleLocal = localStorage.getItem('role')
  let user: UserType | null = null
  let accessToken: string | null = null
  let refreshToken: string | null = null
  let role: string | null = null
  if (userLocal !== null && accessTokenLocal !== null && refreshTokenLocal !== null && roleLocal !== null) {
    user = JSON.parse(userLocal)
    accessToken = JSON.parse(accessTokenLocal)
    refreshToken = JSON.parse(refreshTokenLocal)
    role = JSON.parse(roleLocal)
    dispatch(saveUserLogin({ user, accessToken, refreshToken, role }))
  }
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      dispatch(saveLogout())
      navigate('/')
    })
  }, [dispatch, navigate])
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='' element={<GuestRoute />}>
          <Route path='/' element={<Login />} />
        </Route>
        {/* <Route path='' element={<AuthenticationRoute />}>
          <Route path='/home-page' element={<MainLayout page={<HomePage />} />} />
        </Route> */}
        <Route path='' element={<AdminLayout />}>
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin-manage-health-records' element={<AdminManageHealthRecords />} />
          <Route path='/admin-manage-health-insurances' element={<AdminManageHealthInsurances />} />
          <Route path='/admin-manage-students' element={<AdminManageStudents />} />
          <Route path='/admin-manage-medicines' element={<AdminManageMedicines />} />
          <Route path='/admin-history-use-medicines' element={<AdminManageUsageHistory />} />
          <Route path='/admin-statistic' element={<AdminStatic />} />
          <Route path='/admin-manage-feedback' element={<AdminManageFeedBack />} />
          <Route path='/add-health-record' element={<AddHealthRecord />} />
          <Route path='/add-health-insurance' element={<AddHealthInsurance />} />
          <Route path='/add-medicine' element={<AddMedicineForm />} />
          <Route path='/admin-use-medicine' element={<AddUseMedicine />} />
          <Route path='/admin-add-news' element={<AddNewsForm />} />
        </Route>
        <Route path='' element={<StudentLayout />}>
          <Route path='/student' element={<Dashboard />} />
          <Route path='/student-health-record' element={<StudentHealthRecord />} />
          <Route path='/student-info-personal' element={<StudentInfoPersonal />} />
          <Route path='/student-health-insurance' element={<StudentHealthInsurance />} />
          <Route path='/student-view-medicines' element={<StudentViewMedicines />} />
          <Route path='/student-medicines-usage-history' element={<StudentMedicinesUsageHistory />} />
          <Route path='/student-feedback' element={<StudentFeedBack />} />
        </Route>
        <Route path='' element={<StaffLayout />}>
          <Route path='/staff' element={<Dashboard />} />
          <Route path='/staff-add-health-record' element={<AddHealthRecord />} />
          <Route path='/staff-use-medicine' element={<AddUseMedicine />} />
          <Route path='/health-records' element={<AdminManageHealthRecords />} />
          <Route path='/get-students' element={<AdminManageStudents />} />
          <Route path='/view-medicines' element={<AdminManageMedicines />} />
          <Route path='/history-use-medicines' element={<AdminManageUsageHistory />} />
        </Route>
      </Routes>
      <ToastContainer
        style={{ fontFamily: 'Lexend', fontSize: '13px' }}
        transition={Flip}
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </ThemeProvider>
  )
}

export default App
