import Charts from '@/components/Admin/Charts'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { getStatisticsApi } from '@/services/StatisticService/statisticService'
import { StatisTicType } from '@/@types/statistic'

const AdminStatic = () => {
  const [startDay, setStartDay] = useState<Dayjs | null>(null)
  const [endDay, setEndDay] = useState<Dayjs | null>(null)
  const [data, setStatisticData] = useState<StatisTicType>()
  useEffect(() => {
    const getStatistics = async (startDay: string, endDay: string) => {
      try {
        const response = await getStatisticsApi(startDay, endDay)
        if (response && response.status === 200) {
          console.log(response.data)
          setStatisticData(response.data)
        }
      } catch (error) {
        console.error('Error fetching information personal:', error)
      }
    }
    if (startDay && endDay) getStatistics(startDay?.toISOString(), endDay?.toISOString())
    else if (startDay) getStatistics(startDay?.toISOString(), new Date().toISOString())
    else if (endDay) getStatistics('2020-01-01', endDay.toISOString())
    else getStatistics('2020-01-01', new Date().toISOString())
  }, [startDay, endDay])
  return (
    <div className='p-4'>
      <HeaderAdmin title='Thống Kê Sử Dụng và Nhập Thuốc' />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ marginRight: '20px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={startDay}
                onChange={(newValue) => setStartDay(newValue)}
                slotProps={{ textField: { size: 'small' } }}
                format='DD/MM/YYYY'
                label='Từ ngày'
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={endDay}
                onChange={(newValue) => setEndDay(newValue)}
                slotProps={{ textField: { size: 'small' } }}
                format='DD/MM/YYYY'
                label='Đến ngày'
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
      {data && <Charts data={data} />}
    </div>
  )
}

export default AdminStatic
