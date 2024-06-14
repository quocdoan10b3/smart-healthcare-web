import { AddMedicineType, ImportMedicineType, ImportNewMedicineType } from '@/@types/medicine'
import http from '@/utils/http'
const controller = new AbortController()
export const getMedicinesApi = (page: number, search: string) => {
  return http.get(`api/medicine?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=10&IsDescending=true`, {
    signal: controller.signal
  })
}
export const addMedicineApi = (body: AddMedicineType) => {
  return http.post(`api/medicine/add-medicine`, body, { signal: controller.signal })
}
export const importMedicineApi = (body: ImportMedicineType) => {
  return http.post(`api/medicine/import-medicine`, body, { signal: controller.signal })
}
export const importNewMedicineApi = (body: ImportNewMedicineType) => {
  return http.post(`api/medicine/import-new-medicine`, body, { signal: controller.signal })
}
export const getAllImportMedicineApi = (page: number, search: string) => {
  return http.get(
    `api/medicine/import-medicine?Search=${search}&SortBy=Id&PageNumber=${page}&PageSize=8&IsDescending=true&SortBy=ImportDate`,
    { signal: controller.signal }
  )
}
