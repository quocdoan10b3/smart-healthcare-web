export interface StudentType {
  id: number
  studentCode: string
  studentName: string
  userId: number
  class: string
  date: string
  gender: boolean
  address: string
}
export interface AddStudentType {
  email: string
  password: string
  fullName: string
  userName: string
  avatarUrl: string
  class: string
  gender: boolean
  dateOfBirth: string
  address: string
}
