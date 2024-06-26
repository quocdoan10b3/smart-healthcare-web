import { AddStudentType, UpdateStudentType } from '@/@types/student'
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
export const addListStudentsApi = (body: AddStudentType[]) => {
  return http.post(`api/auth/add-list-students`, body, { signal: controller.signal })
}
export const getStudentByIdApi = (id: number) => {
  return http.get(`api/student/userId/${id}`, { signal: controller.signal })
}
export const updateStudentById = (id: number, body: UpdateStudentType) => {
  return http.put(`api/student?studentId=${id}`, body, { signal: controller.signal })
}
