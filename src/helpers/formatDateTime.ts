export const formatDateTime = (inputDateString: string) => {
  const date = new Date(inputDateString)

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const paddedDay = day.toString().padStart(2, '0')
  const paddedMonth = month.toString().padStart(2, '0')
  const paddedYear = year.toString()

  const formattedDateString = `${paddedDay}/${paddedMonth}/${paddedYear}`
  return formattedDateString
}
