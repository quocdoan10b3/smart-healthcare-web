export interface HealthInsuranceType {
  id: number
  insuranceNumber: string
  studentName: string
  studentId: number
  expDate: string
  status: boolean
  scholastic: string
}
export interface AddHealthInsuranceType {
  insuranceNumber: string
  status: boolean
  scholastic: string
}
export interface UpdateStatusInsuranceType {
  status: boolean
}
