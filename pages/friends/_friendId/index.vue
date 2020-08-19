<template>
  <Loader v-if="$fetchState.pending" />
  <PersonDetail
    v-else
    :nickname="flattenFriend.nickname"
    :latitude="flattenFriend.latitude"
    :longitude="flattenFriend.longitude"
    :datetime="flattenFriend.datetime"
    :face-image-url="flattenFriend.face_image_url"
  />
</template>

<script>
import {
  defineComponent,
  useContext,
  computed,
  ref,
} from '@nuxtjs/composition-api'
import { convertFlattenFriend } from '~/modules/friend'
import { useAppFetch } from '~/modules/fetch'

export default defineComponent({
  setup() {
    const { route } = useContext()
    const friend = ref([])

    useAppFetch({
      data: friend,
      url: '/api/friends/' + route.value.params.friendId,
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
