import http from '@/utils/http'

const controller = new AbortController()
export const postImage = (body: FormData) => {
  console.log('post: vao day chua')
  console.log(body)
  return http.post(`api/attachments/upload-attachment`, body, { signal: controller.signal })
}
