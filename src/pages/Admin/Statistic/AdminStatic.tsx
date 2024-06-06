import Charts from '@/components/Admin/Charts'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import { getStatisticsApi } from '@/services/StatisticService/statisticService'
import { StatisTicType } from '@/@types/statistic'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
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
  const getCurrentDate = () => {
    return dayjs()
  }
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
                maxDate={endDay || getCurrentDate()}
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
                maxDate={getCurrentDate()}
                minDate={startDay || dayjs('2020-01-01')}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
      {data && data.topMedicineUsages.length > 0 ? (
        <Charts data={data} />
      ) : (
        <div className='px-5 md:px-10 items-center text-center'>
          <div className='mx-auto w-full max-w-7xl'>
            <div className='py-12'>
              <div className='grid grid-cols-1 md:grid-cols-1 gap-12 items-center'>
                <div className='py-8'>
                  <h1 className='font-bold text-cyan-700 mb-8 text-2xl text-center'>
                    Không có dữ liệu thống kê trong thời gian này <SentimentVeryDissatisfiedIcon />
                  </h1>
                  <p className='text-center text-cyan-700'>Hãy chọn khoảng thời gian khác!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminStatic
