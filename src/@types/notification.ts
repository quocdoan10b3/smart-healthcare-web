export interface NotificationType {
  id: number
  title: string
  content: string
  image: string
  dateCreatAt: string
}
export interface AddNewsType {
  title: string
  content: string
  image: string
  dateCreatAt: string
  staffId: number
}
