<template>
  <PersonDetail
    v-if="flattenFriend"
    :nickname="flattenFriend.nickname"
    :latitude="flattenFriend.latitude"
    :longitude="flattenFriend.longitude"
    :datetime="flattenFriend.datetime"
    :face-image-url="flattenFriend.face_image_url"
  />
  <Loader v-else />
</template>

<script>
import { defineComponent, useContext, computed } from '@nuxtjs/composition-api'
import { useAppAxios } from '~/modules/axios'
import { convertFlattenFriend } from '~/modules/friend'

export default defineComponent({
  setup() {
    const { route } = useContext()
    const { data: friend } = useAppAxios({
      url: '/api/friends/' + route.value.params.friendId,
      immediate: true,
    })
    const flattenFriend = computed(() =>
      friend && friend.value ? convertFlattenFriend(friend.value) : null
    )

    return {
      flattenFriend,
    }
  },
})
</script>
