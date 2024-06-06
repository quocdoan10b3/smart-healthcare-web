import { Pie, Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { StatisTicType } from '@/@types/statistic'

Chart.register(ArcElement, Tooltip, Legend)
interface PropsType {
  data: StatisTicType
}
const Charts = ({ data }: PropsType) => {
  const doughnutData = {
    labels: ['Tổng thuốc nhập', 'Tổng lần sử dụng thuốc'],
    datasets: [
      {
        data: [data.importedMedicineCount, data.totalUsageMedicinesCount],
        backgroundColor: ['#f87893', '#57b1ed']
      }
    ]
  }

  const topMedicines = data.topMedicineUsages.slice(0, 3)
  const topThreeTotal = topMedicines.reduce((total, med) => total + med.totalQuantity, 0)
  const otherQuantity = data.totalUsageMedicinesCount - topThreeTotal

  const topMedicineLabels = topMedicines.map((med) => med.nameMedicine).concat(otherQuantity > 0 ? ['Khác'] : [])
  const topMedicineData = topMedicines.map((med) => med.totalQuantity).concat(otherQuantity > 0 ? [otherQuantity] : [])

  const topMedicineDataPie = {
    labels: topMedicineLabels,
    datasets: [
      {
        data: topMedicineData,
        backgroundColor: ['#f87893', '#57b1ed', '#e0be68', '#68e6e6']
      }
    ]
  }

  return (
    <div className=''>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '37%', margin: '0 10px' }}>
          <h2 className='text-cyan-600 text-lg text-center'>Tổng số thuốc nhập và sử dụng</h2>
          <Doughnut data={doughnutData} />
        </div>
        <div style={{ width: '37.1%', margin: '0 10px' }}>
          <h2 className='text-cyan-600 text-lg text-center'>Top thuốc sử dụng</h2>
          <Pie data={topMedicineDataPie} />
        </div>
      </div>
      <div className='grid grid-cols-1 text-violet-500 text-base p-1 gap-1 ml-20'>
        <p>
          Số lần sử dụng thuốc: <span className='ml-1'>{data.usageMedicineStudentCount}</span>
        </p>
        <p>
          Số loại thuốc nhập: <span className='ml-1'>{data.importedTypeOfMedicineCount}</span>
        </p>
        <p>
          Số lần nhập thuốc: <span className='ml-1'>{data.importCount}</span>
        </p>
      </div>
    </div>
  )
}

export default Charts
