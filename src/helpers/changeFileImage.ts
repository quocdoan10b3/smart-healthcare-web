import { postImage } from '@/services/Attachment/attachmentService'

export const ImageChangeOneFile = async (image: File) => {
  const formData = new FormData()
  formData.append('file', image)
  const response = await postImage(formData)
  return response.data
}
