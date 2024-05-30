import http from '@/utils/http'
const controller = new AbortController()
export const getMedicinesApi = (page: number, search: string) => {
  return http.get(`api/medicine?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=10&IsDescending=true`, {
    signal: controller.signal
  })
}
