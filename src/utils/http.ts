import axios, { AxiosInstance } from 'axios'
import autoRefreshToken from './autoRefreshToken'
import { toast } from 'react-toastify'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// let refreshTokenRequest: any = null
export const LocalStorageEventTarget = new EventTarget()
class Http {
  instance: AxiosInstance
  private refreshTokenRequest: Promise<string> | null = null
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 10000
    })

    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
          config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    this.instance.interceptors.response.use(
      (config) => config,
      (error) => {
        console.log('Loi api', error)
        if (error.response.status !== 401) {
          //
        }
        if (error.response.status === 401) {
          console.log('AccessToken hết hạn', this.refreshTokenRequest)
          this.refreshTokenRequest = this.refreshTokenRequest
            ? this.refreshTokenRequest
            : autoRefreshToken().finally(() => {
                this.refreshTokenRequest = null
              })
          return (
            this.refreshTokenRequest
              .then((accessToken: string) => {
                error.response.config.Authorization = `Bearer ${JSON.parse(accessToken)}`
                console.log('accessToken', accessToken)
                return this.instance(error.response.config)
              })
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .catch((errorRefreshToken: any) => {
                console.log('Refresh token hết hạn hoặc chưa đăng nhập')
                localStorage.clear()
                const clearLSEvent = new Event('clearLS')
                LocalStorageEventTarget.dispatchEvent(clearLSEvent)
                toast.error('Bạn đã hết phiên đăng nhập !')
                throw errorRefreshToken
              })
          )
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
