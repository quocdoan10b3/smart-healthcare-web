import http from '@/utils/http'
const controller = new AbortController()
export const getAllHealthInsurancesApi = (page: number, status: string, search: string) => {
  if (status === 'All') {
    return http.get(`api/health-insurance?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=5&IsDescending=true`, {
      signal: controller.signal
    })
  } else if (status === 'True') {
    return http.get(
      `api/health-insurance?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=5&IsDescending=true&Filter=True`,
      {
        signal: controller.signal
      }
    )
  } else {
    return http.get(
      `api/health-insurance?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=5&IsDescending=true&Filter=False`,
      {
        signal: controller.signal
      }
    )
  }
}
