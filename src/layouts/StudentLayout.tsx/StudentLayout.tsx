import { ReactNode } from 'react'

type propTypes = {
  page: ReactNode
}

const StudentLayout = ({ page }: propTypes) => {
  return (
    <div>
      <div className='mx-auto w-full max-w-[1440px] mt-[80px]'>{page}</div>
    </div>
  )
}

export default StudentLayout
