/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddStudentType } from '@/@types/student'
import * as XLSX from 'xlsx'

export const readExcelFile = (file: File, callback: (students: AddStudentType[]) => void): void => {
  const reader = new FileReader()

  reader.onload = (event: ProgressEvent<FileReader>) => {
    if (!event.target?.result) return
    const data = new Uint8Array(event.target.result as ArrayBuffer)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json<any>(worksheet)
    jsonData.forEach((row: any) => {
      console.log('Gender:', row.Gender)
    })
    const students: AddStudentType[] = jsonData.map((row: any) => ({
      email: row.Email,
      password: row.Password,
      fullName: row.FullName,
      userName: row.UserName,
      avatarUrl: row.AvatarUrl,
      class: row.Class,
      gender: row.Gender,
      dateOfBirth: XLSX.SSF.format('yyyy-mm-dd', row.DateOfBirth),
      address: row.Address
    }))

    callback(students)
  }

  reader.readAsArrayBuffer(file)
}
