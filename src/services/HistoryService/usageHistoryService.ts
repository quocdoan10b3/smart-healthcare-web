import http from '@/utils/http'
const controller = new AbortController()
export const getAllUsageHistoriesApi = (page: number, search: string) => {
  return http.get(`api/usage-medicines?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=7&IsDescending=true`, {
    signal: controller.signal
  })
}
export const addUsageMedicines = (studentId: number, body: unknown) => {
  return http.post(`api/usage-medicines/${studentId}`, body, { signal: controller.signal })
}
export const getUsageHistoryByUserIdApi = (userId: number, page: number, search: string) => {
  return http.get(
    `api/usage-medicines/userId/${userId}?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=2&IsDescending=true`,
    {
      signal: controller.signal
    }
  )
}
