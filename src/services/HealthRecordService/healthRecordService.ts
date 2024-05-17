import http from '@/utils/http'
const controller = new AbortController()
export const getAllHealthRecordsApi = (page: number, search: string) => {
  return http.get(`api/health-record?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=5&IsDescending=true`, {
    signal: controller.signal
  })
}
