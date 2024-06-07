import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { Button, Pagination, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import StudentItem from './StudentItem'
import AddStudentForm from '@/components/Admin/AddStudentForm'
import { StudentType } from '@/@types/student'
import { getAllStudentsApi } from '@/services/StudentService/studentService'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
const AdminManageStudents = () => {
  const role = useSelector((state: RootState) => state.auth.role)
  const [search, setSearch] = useState<string>('')
  const [listStudents, setListStudents] = useState<StudentType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string)
  }
  useEffect(() => {
    getListStudents(currentPage, search)
  }, [currentPage, search])
  const getListStudents = async (currentPage: number, search: string) => {
    try {
      const response = await getAllStudentsApi(currentPage, search)
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages)
        setListStudents(response.data.items)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  const handleAddStudent = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const refreshStudents = () => {
    getListStudents(currentPage, search)
  }

  return (
    <div className='p-4 '>
      <HeaderAdmin title='Quản lý danh sách học sinh' />
      <div className='flex justify-between'>
        {role && role.toUpperCase() === 'ADMIN' && (
          <Button variant='contained' onClick={handleAddStudent} sx={{ width: 200, background: '#068124', my: 2 }}>
            Thêm học sinh
          </Button>
        )}

        <TextField
          size='small'
          label='Tìm kiếm'
          variant='outlined'
          value={search}
          onChange={handleSearchChange}
          sx={{ width: 300, background: 'white', ml: 'auto', my: 2 }}
        />
      </div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
            <tr>
              <th scope='col' className='px-4 py-3 '>
                ID
              </th>
              <th scope='col' className='px-3 py-3 '>
                Mã học sinh
              </th>
              <th scope='col' className='px-3 py-3'>
                Tên học sinh
              </th>
              <th scope='col' className='px-3 py-3'>
                Lớp
              </th>
              <th scope='col' className='px-3 py-3'>
                Ngày sinh
              </th>
              <th scope='col' className='px-3 py-3'>
                Giới tính
              </th>
              <th scope='col' className='px-3 py-3'>
                Địa chỉ
              </th>
              {role && ['ADMIN', 'STAFF'].includes(role.toUpperCase()) && (
                <th scope='col' className='px-3 py-3'>
                  Lựa chọn
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {listStudents.map((hr) => (
              <StudentItem student={hr} refreshStudents={refreshStudents} />
            ))}
          </tbody>
        </table>
        <div className='py-4 px-4 flex justify-end'>
          <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
        </div>
      </div>
      {role && role.toUpperCase() === 'ADMIN' && (
        <AddStudentForm open={openDialog} handleClose={handleCloseDialog} refreshStudents={refreshStudents} />
      )}
    </div>
  )
}

export default AdminManageStudents
