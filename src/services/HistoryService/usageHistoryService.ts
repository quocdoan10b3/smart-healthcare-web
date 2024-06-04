import http from '@/utils/http'
const controller = new AbortController()
export const getAllUsageHistoriesApi = (page: number, search: string) => {
  return http.get(`api/usage-medicines?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=6&IsDescending=true`, {
    signal: controller.signal
  })
}
export const addUsageMedicines = (studentId: number, body: unknown) => {
  return http.post(`api/usage-medicines/${studentId}`, body, { signal: controller.signal })
}
