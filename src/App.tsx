import { ThemeProvider, createTheme } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Lexend'
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Routes></Routes>
    </ThemeProvider>
  )
}

export default App
