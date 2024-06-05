import { AddHealthInsuranceType, UpdateStatusInsuranceType } from '@/@types/healthInsurance'
import http from '@/utils/http'
const controller = new AbortController()
export const getAllHealthInsurancesApi = (page: number, status: string, scholastic: string, search: string) => {
  if (status === 'All') {
    return http.get(
      `api/health-insurance?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=6&IsDescending=true&Filter=${scholastic}`,
      {
        signal: controller.signal
      }
    )
  } else if (status === 'True') {
    return http.get(
      `api/health-insurance?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=6&IsDescending=true&FilterStatus=True&Filter=${scholastic}`,
      {
        signal: controller.signal
      }
    )
  } else {
    return http.get(
      `api/health-insurance?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=6&IsDescending=true&FilterStatus=False&Filter=${scholastic}`,
      {
        signal: controller.signal
      }
    )
  }
}
export const checkHealthInsurance = (studentId: number, currentYear: number) => {
  return http.get(`api/health-insurance/${studentId}/is_health_insurance/${currentYear}`, {
    signal: controller.signal
  })
}
export const addHealthInsuranceApi = (studentId: number, body: AddHealthInsuranceType) => {
  return http.post(`api/health-insurance/${studentId}`, body, { signal: controller.signal })
}
export const updateStatusInsuranceApi = (id: number, body: UpdateStatusInsuranceType) => {
  return http.put(`api/health-insurance/${id}`, body, { signal: controller.signal })
}
export const getInsuranceStudentByUserIdApi = (id: number) => {
  return http.get(`api/health-insurance/userId/${id}`, {
    signal: controller.signal
  })
}
