import { MedicineType } from '@/@types/medicine'
import { Box, Button, Tooltip } from '@mui/material'
import ImageSalonPas from '@/assets/images/salonpas.jpg'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
interface PropsType {
  medicine: MedicineType
}
const MedicineItem = ({ medicine }: PropsType) => {
  return (
    <div className='shadow-md p-2 rounded-lg mx-auto bg-green-100'>
      <Box sx={{ minWidth: 200 }}>
        <div className='flex justify-between'>
          <p className=''>{medicine.name}</p>
          <Tooltip title={medicine.effect} arrow>
            <InfoOutlinedIcon />
          </Tooltip>
        </div>
        <Box
          component='img'
          sx={{
            height: 130,
            display: 'block',
            maxWidth: 400,
            overflow: 'hidden',
            width: '100%',
            paddingTop: '10px'
          }}
          src={ImageSalonPas}
          // alt={step.label}
        />
        <div className='p-1'>
          <div className='flex justify-between py-1'>
            <p className='font-extralight'>Số lượng</p>
            <p className='text-red-800  font-extralight'>{medicine.quantity} </p>
          </div>
          <div className='flex justify-center pt-2'>
            <Button variant='contained' size='small'>
              Sử dụng
            </Button>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default MedicineItem
