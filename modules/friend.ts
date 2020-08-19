import { Friend } from '~/types/app'
import { dayjs } from '~/plugins/dayjs'

export const convertFlattenFriend = (friend: Friend) => ({
  id: friend.id,
  face_image_url: friend.face_image_url,
  nickname: friend.nickname,
  datetime: friend.pin
    ? dayjs(friend.pin.datetime).format('YYYY/MM/DD HH:mm')
    : '',
  latitude: friend.pin ? friend.pin.latitude : 0,
  longitude: friend.pin ? friend.pin.longitude : 0,
})
