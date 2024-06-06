export interface HealthInsuranceType {
  id: number
  insuranceNumber: string
  studentName: string
  studentId: number
  expDate: string
  status: boolean
  scholastic: string
  address: string
  dateOfBirth: string
  staffId: number
}
export interface AddHealthInsuranceType {
  insuranceNumber: string
  status: boolean
  scholastic: string
  staffId: number
}
export interface UpdateStatusInsuranceType {
  status: boolean
}
