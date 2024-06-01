import { AddHealthRecordType } from '@/@types/healthRecord'
import http from '@/utils/http'
const controller = new AbortController()
export const getAllHealthRecordsApi = (page: number, search: string) => {
  return http.get(`api/health-record?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=6&IsDescending=true`, {
    signal: controller.signal
  })
}
export const checkStudentIsExamined = (studentId: number) => {
  return http.get(`api/health-record/${studentId}/is-examined`, {
    signal: controller.signal
  })
}
export const addHealthRecordApi = (studentId: number, body: AddHealthRecordType) => {
  return http.post(`api/health-record/${studentId}`, body, { signal: controller.signal })
}
