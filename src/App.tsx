import { ThemeProvider, createTheme } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import GuestRoute from './routes/guest-route'
import './index.css'
import Login from './components/Authenticate/Login'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Lexend'
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='' element={<GuestRoute />}>
          <Route path='/' element={<Login />} />
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
