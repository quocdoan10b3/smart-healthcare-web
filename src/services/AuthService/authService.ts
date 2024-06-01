import { LoginType } from '@/@types/user'
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