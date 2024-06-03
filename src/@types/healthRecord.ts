export interface HealthRecordType {
  id: number
  studentId: number
  studentName: string
  examDate: string
  height: number
  weight: number
  vision: number
  hearing: string
  dentalHealth: string
  allergies: string
  notes: string
}
export interface AddHealthRecordType {
  examDate: string
  height: number
  weight: number
  vision: number
  hearing: string
  dentalHealth: string
  allergies: string
  notes: string
  scholastic: string
}
