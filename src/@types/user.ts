export interface LoginType {
  identifier: string
  password: string
}
export interface LogoutType {
  refreshToken: string
}
export interface LoginResponse {
  user: UserType | null
  accessToken: string | null
  refreshToken: string | null
  role: string | null
}
export interface UserType {
  id: number
  fullName: string
  email: string
  userName: string
  role: string
  avatarUrl: null | string
}
export interface InfoAccountPut {
  email: string
  avatarUrl: string
}
export interface ChangePasswordType {
  currentPassword: string
  newPassword: string
}
export interface ResetPasswordType {
  username: string
  email: string
  fullName: string
}
