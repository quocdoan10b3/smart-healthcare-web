import { AddStudentType } from '@/@types/student'
import http from '@/utils/http'
const controller = new AbortController()
export const getAllStudentsApi = (page: number, search: string) => {
  return http.get(`api/student?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=6&IsDescending=true`, {
    signal: controller.signal
  })
}
export const addStudentApi = (body: AddStudentType) => {
  return http.post(`api/auth/add-student`, body, { signal: controller.signal })
}
