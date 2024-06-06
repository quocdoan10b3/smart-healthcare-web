import http from '@/utils/http'
const controller = new AbortController()
export const getStatisticsApi = (fromDay: string, toDay: string) => {
  return http.get(`api/statistics?From=${fromDay}&To=${toDay}`, {
    signal: controller.signal
  })
}
