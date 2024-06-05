export interface UsageHistoryType {
  id: number
  studentId: number
  usageDate: string
  reason: string
  studentName: string
  classStudent: string
  studentCode: string
  prescriptionResponses: [
    {
      historyId: number
      medicineId: number
      nameMedicine: string
      quantity: number
    }
  ]
}
