import { ChangePasswordType, LoginType, ResetPasswordType } from '@/@types/user'
import http from '@/utils/http'
const controller = new AbortController()
export const postLogin = (body: LoginType) => {
  return http.post('api/auth/login', body, { signal: controller.signal })
}
export const postLogout = (refreshToken: string) => {
  // console.log('body:',body)
  return http.post(`api/auth/revoke-token?refreshToken=${refreshToken}`)
}
export const postRefreshToken = (body: { refreshToken: string }) => {
  return http.post('api/auth/refresh', body, { signal: controller.signal })
}
export const getUserByIdApi = (userId: number) => {
  return http.get(`api/user/${userId}`, { signal: controller.signal })
}
export const updateAvatarUserApi = (userId: number, body: { avatarUrl: string }) => {
  return http.put(`api/user/${userId}`, body, { signal: controller.signal })
}
export const getStaffIdByUserIdApi = (userId: number) => {
  return http.get(`api/user/staff/${userId}`, { signal: controller.signal })
}
export const deleteUserApi = (userId: number) => {
  return http.delete(`api/user/${userId}`)
}
export const changePasswordApi = (body: ChangePasswordType) => {
  return http.post(`api/user/change-password`, body, { signal: controller.signal })
}
export const resetPasswordApi = (body: ResetPasswordType) => {
  return http.post(`api/auth/reset-password`, body, { signal: controller.signal })
}
