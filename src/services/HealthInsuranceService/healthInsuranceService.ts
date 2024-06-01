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
