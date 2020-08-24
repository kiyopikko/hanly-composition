<template>
  <div class="wrap">
    <PersonDetail
      :nickname="nickname"
      :latitude="latitude"
      :longitude="longitude"
      :datetime="datetime"
      :face-image-url="face_image_url"
      editable
    />
    <BaseButton is-txt @click="logout">ログアウト</BaseButton>
  </div>
</template>

<script lang="ts">
import localStorage from 'store2'
import {
  defineComponent,
  computed,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { dayjs } from '~/plugins/dayjs'

export default defineComponent({
  head: {},
  setup(_p, { root: { $router } }) {
    const { store } = useContext()
    const face_image_url = computed(() => store.getters['me/face_image_url'])
    const nickname = computed(() => store.getters['me/nickname'])
    const latitude = computed(() => store.getters['me/latitude'])
    const longitude = computed(() => store.getters['me/longitude'])
    const datetime = computed(() =>
      dayjs(store.getters['me/datetime']).format('YYYY/MM/DD HH:mm')
    )
    const logout = () => {
      localStorage('hanly_access_token', '')
      $router.push('/')
    }

    useMeta({ title: 'マイページ | Hanly' })

    return {
      face_image_url,
      nickname,
      latitude,
      longitude,
      datetime,
      logout,
    }
  },
})
</script>

<style lang="scss" scoped>
.wrap {
  padding-bottom: 2rem;
}
</style>
