import { useState } from 'react'
import Login from '@/components/Authenticate/Login'
const Authenticate = () => {
  const [isLogin] = useState<boolean>(true)
  return (
    <div className=''>
      <div className=''>
        <div className=''>
          <div className=''>
            {isLogin && <Login />}
            <div className=''></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authenticate
