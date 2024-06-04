import { IMedicine, IMedicineUse } from '@/components/Admin/AddUseMedicine/AddUseMedicine'
import { Button } from '@mui/material'
import React from 'react'

interface IProps {
  listMedicine: IMedicine[]
  setUseMedicine: React.Dispatch<React.SetStateAction<IMedicineUse[]>>
}

const ListMedicine = ({ listMedicine, setUseMedicine }: IProps) => {
  const handleUseMedicine = (medicine: IMedicine) => {
    setUseMedicine((prev) => {
      const isExist = prev.find((item) => item.id === medicine.id)
      if (!isExist) prev.push({ ...medicine, quantityShouldUse: 1 })
      return [...prev]
    })
  }

  return (
    <div className='grid grid-cols-3 gap-4'>
      {listMedicine.map((medicine) => (
        <div className='bg-white' key={medicine.id}>
          <img src={medicine.imageMedicine} alt={medicine.name} className='w-[200px] h-[180px]' />
          <div className='p-3'>
            <div className='flex justify-between py-1'>
              <p className='font-extralight'>Số lượng</p>
              <p className='text-red-800  font-extralight'>{medicine.quantity} </p>
            </div>
            <Button
              variant='contained'
              disabled={medicine.quantity === 0}
              size='small'
              onClick={() => {
                handleUseMedicine(medicine)
              }}
            >
              Thêm
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListMedicine
