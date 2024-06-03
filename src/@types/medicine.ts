export interface MedicineType {
  id: number
  name: string
  quantity: number
  effect: string
  importDate: string
  expDate: string
  imageMedicine: string
}
export interface ImportMedicineType {
  quantity: number
  importDate: string
  expDate: string
  medicineId: number
}
export interface ImportNewMedicineType {
  nameMedicine: string
  effect: string
  imageMedicine: string
  quantity: number
  importDate: string
  expDate: string
}
export interface AddMedicineType {
  name: string
  effect: string
  imageMedicine: string
}
