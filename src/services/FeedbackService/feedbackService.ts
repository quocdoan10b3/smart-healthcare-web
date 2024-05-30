import { AddResponseType } from '@/@types/feedback'
import http from '@/utils/http'
const controller = new AbortController()
export const getAllFeedbacksApi = (page: number, search: string) => {
  return http.get(`api/feed-back?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=6&IsDescending=true`, {
    signal: controller.signal
  })
}
export const addResponseApi = (body: AddResponseType, id: number) => {
  return http.put(`api/feed-back/${id}`, body, { signal: controller.signal })
}
