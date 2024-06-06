export interface StatisTicType {
  importCount: number
  importedTypeOfMedicineCount: number
  importedMedicineCount: number
  usageMedicineStudentCount: number
  totalUsageMedicinesCount: number
  topMedicineUsages: [
    {
      medicineId: number
      nameMedicine: string
      totalQuantity: number
    }
  ]
}
