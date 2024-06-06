import { AddCommentsType, AddResponseType } from '@/@types/feedback'
import { AddNewsType } from '@/@types/notification'
import http from '@/utils/http'
const controller = new AbortController()
export const getAllFeedbacksApi = (page: number, search: string) => {
  return http.get(`api/feed-back?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=2&IsDescending=true`, {
    signal: controller.signal
  })
}
export const addResponseApi = (body: AddResponseType, id: number) => {
  return http.put(`api/feed-back/${id}`, body, { signal: controller.signal })
}
export const addCommentsStudentApi = (body: AddCommentsType, userId: number) => {
  return http.post(`api/feed-back/student/${userId}`, body, { signal: controller.signal })
}
export const getListNewsApi = (page: number, search: string) => {
  return http.get(`api/news?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=4&IsDescending=true`, {
    signal: controller.signal
  })
}
export const addNewsApi = (body: AddNewsType) => {
  return http.post(`api/news`, body, { signal: controller.signal })
}
