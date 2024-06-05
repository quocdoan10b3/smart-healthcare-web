export interface FeedbackType {
  id: number
  studentName: string
  studentId: number
  rating: number
  comments: string
  commentDate: string
  response: string
  responseDate: string
  avatarUrl: string
}
export interface AddResponseType {
  response: string
}
export interface AddCommentsType {
  rating: number
  comments: string
}
