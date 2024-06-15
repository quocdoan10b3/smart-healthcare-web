import { AddStaffType, UpdateStaffType } from '@/@types/staff'
import http from '@/utils/http'
const controller = new AbortController()
export const getAllStaffApi = (page: number, search: string) => {
  return http.get(`api/staff?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=7&IsDescending=true`, {
    signal: controller.signal
  })
}
export const addStaffApi = (body: AddStaffType) => {
  return http.post(`api/auth/add-staff`, body, { signal: controller.signal })
}
export const getStaffByUserIdApi = (userId: number) => {
  return http.get(`api/staff/${userId}`, { signal: controller.signal })
}
export const updateStaffByIdApi = (id: number, body: UpdateStaffType) => {
  return http.put(`api/staff?staffId=${id}`, body, { signal: controller.signal })
}
