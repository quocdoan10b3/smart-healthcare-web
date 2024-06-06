import { ReactNode, useState } from 'react'
import PropTypes from 'prop-types'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ButtonLogout from '../Authenticate/ButtonLogout'
import ImageLogo from '@/assets/images/logo_web.jpg'
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined'
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined'
import BarChartIcon from '@mui/icons-material/BarChart'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'
interface PropsType {
  title: string
  to: string
  icon: ReactNode
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

const Item = ({ title, to, icon, selected, setSelected }: PropsType) => {
  return (
    <MenuItem active={selected === title} onClick={() => setSelected(title)} icon={icon} style={{ color: 'red' }}>
      <p>{title}</p>
      <Link to={to} />
    </MenuItem>
  )
}

const StaffSidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  //   const role = useSelector((state: RootState) => state.auth.role)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('Dashboard')
  return (
    <Box
      sx={{
        position: 'fixed',
        height: '100vh',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        '& .pro-sidebar-inner': {
          background: `#4f65d2 !important`
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important'
        },
        '& .pro-menu-item': {
          color: '#ecc7c7  !important'
        },
        '& .pro-inner-item': {
          // padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#061207 !important'
        },
        '& .pro-menu-item.active': {
          color: '#05fa2a !important'
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* Logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0'
            }}
          >
            {!isCollapsed && (
              <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
                <p className='font-bold text-gray-100'>CÁN BỘ Y TẾ</p>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb='25px'>
              <Box>
                <p className='py-2 px-4 text-base font-bold text-gray-100 text-center'>QUẢN LÝ Y TẾ HỌC ĐƯỜNG</p>
              </Box>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <img
                  alt='profile-user'
                  width={100}
                  height={100}
                  //   src={user?.avatarUrl || ImageAdminDefault}
                  src={ImageLogo}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : '3%'} sx={{ width: '280px' }}>
            {/* <Item
              title='Dashboard'
              to='/admin'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title='Danh sách học sinh'
              to='get-students'
              icon={<AccountBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Hồ sơ khám sức khỏe'
              to='health-records'
              icon={<MeetingRoomIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Danh sách BHYT'
              to='/health-insurances'
              icon={<ViewListOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Kho thuốc của trường'
              to='view-medicines'
              icon={<MedicalInformationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Lịch sử dùng thuốc'
              to='history-use-medicines'
              icon={<ManageHistoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Thống kê'
              to='staff-statistic'
              icon={<BarChartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Đánh giá và hỏi đáp'
              to='manage-feedback'
              icon={<FeedbackOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
      {!isCollapsed && (
        <Box mt='auto' sx={{ background: '#4f65d2' }}>
          <Box display='flex' justifyContent='center' alignItems='end'>
            <img
              alt='profile-user'
              width={40}
              height={40}
              src={user && user.avatarUrl ? `${user?.avatarUrl}` : ``}
              // src={ImageAdminDefault}
              style={{ cursor: 'pointer', borderRadius: '50%' }}
            />
            <p className='pt-2 font-bold text-gray-100 ml-5'>{user?.fullName}</p>
          </Box>
          <Box display='flex' justifyContent='center' alignItems='center' mt='1px' mb='30px'>
            <ButtonLogout />
          </Box>
        </Box>
      )}
    </Box>
  )
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired
}
export default StaffSidebar
