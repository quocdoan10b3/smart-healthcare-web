export interface StaffType {
  id: number
  userId: number
  fullName: string
  date: string
  gender: boolean
  address: string
}
export interface AddStaffType {
  email: string
  password: string
  fullName: string
  userName: string
  avatarUrl: string
  gender: boolean
  dateOfBirth: string
  address: string
}
export interface UpdateStaffType {
  address: string
  dateOfBirth: string
  gender: boolean
}
