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
  useMeta,
  watch,
} from '@nuxtjs/composition-api'
import { convertFlattenFriend } from '~/modules/friend'
import { useAppFetch } from '~/modules/fetch'

export default defineComponent({
  head: {},
  setup() {
    const { route } = useContext()
    const { title } = useMeta({ title: '読み込み中... | Hanly' })
    const friend = ref(null)

    useAppFetch({
      data: friend,
      url: '/api/friends/' + route.value.params.friendId,
    })

    const flattenFriend = computed(() =>
      friend && friend.value ? convertFlattenFriend(friend.value) : null
    )

    watch([friend], () => {
      if (friend.value) {
        title.value = `${friend.value.nickname} | Hanly`
      }
    })

    return {
      flattenFriend,
    }
  },
})
</script>
