import { Box, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { Link } from 'react-router-dom'

const Topbar = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#a1aff4',
        padding: '1px',
        boxShadow: '0 2px 4px rgba(222, 120, 25, 0.1)',
        marginBottom: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
        <p className='text-xl font-bold m-0 text-rose-800'>HỆ THỐNG QUẢN LÝ Y TẾ HỌC ĐƯỜNG</p>
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        <Link to='/'>
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  )
}

export default Topbar
