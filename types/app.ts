export interface Friend {
  id: number
  face_image_url: string
  nickname: string
  pin?: {
    datetime: string
    latitude: number
    longitude: number
  }
}
