import { IMedicineUse } from '@/components/Admin/AddUseMedicine/AddUseMedicine'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, IconButton, Table, TableBody, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import RemoveIcon from '@mui/icons-material/Remove'
import { useState } from 'react'
import { addUsageMedicines } from '@/services/HistoryService/usageHistoryService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
interface iProps {
  useMedicine: IMedicineUse[]
  setUseMedicine: React.Dispatch<React.SetStateAction<IMedicineUse[]>>
  idStudent: number
}

const UseMedicine = ({ useMedicine, setUseMedicine, idStudent }: iProps) => {
  const [reason, setReason] = useState('')
  const navigate = useNavigate()
  const handleAddQuantity = (medicine: IMedicineUse, index: number) => {
    setUseMedicine((prev) => {
      prev[index] = { ...medicine, quantityShouldUse: medicine.quantityShouldUse + 1 }
      return [...prev]
    })
  }
  const handleMinusQuantity = (medicine: IMedicineUse) => {
    setUseMedicine((prev) => {
      const index = prev.findIndex((item) => item.id === medicine.id)
      if (index !== -1) {
        if (prev[index].quantityShouldUse > 1) {
          const newMedicine = [...prev]
          newMedicine[index] = { ...medicine, quantityShouldUse: medicine.quantityShouldUse - 1 }
          return newMedicine
        } else {
          const newMedicine = [...prev]
          newMedicine.splice(index, 1)
          return newMedicine
        }
      } else {
        return prev
      }
    })
  }

  const handleCallAPI = async () => {
    const addPrescriptionRequests = useMedicine.map((item) => ({
      medicineId: item.id,
      quantity: item.quantityShouldUse
    }))
    const request = {
      usageDate: new Date(),
      reason: reason,
      addPrescriptionRequests
    }
    try {
      await addUsageMedicines(idStudent, request)
      toast.success('Tạo đơn thuốc thành công')
      navigate('/admin-history-use-medicines')
    } catch (error) {
      console.log(error)
    }
    console.log('request', request)
  }

  return (
    <div>
      <div className=' flex gap-12 mb-3'>
        <p className='mt-1'>
          <em>Lý do: </em>
        </p>
        <TextField
          value={reason}
          placeholder='Nhập lý do'
          size='small'
          onChange={(e) => {
            setReason(e.target.value)
          }}
        />
      </div>
      <div className='flex gap-3 mb-1'>
        <p>
          <em>Đơn thuốc:</em>
        </p>
      </div>
      <TableContainer component={Paper} sx={{ minWidth: 400, minHeight: 200 }}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Tên thuốc</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {useMedicine.map((row, index) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell>{row.quantityShouldUse}</TableCell>
                <TableCell>
                  {row.quantityShouldUse >= 1 && (
                    <IconButton onClick={() => handleMinusQuantity(row)}>
                      <RemoveIcon />
                    </IconButton>
                  )}
                  <IconButton onClick={() => handleAddQuantity(row, index)}>
                    <Add />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleCallAPI} variant='contained' sx={{marginTop:'15px'}}>
        Thêm đơn thuốc
      </Button>
    </div>
  )
}

export default UseMedicine
