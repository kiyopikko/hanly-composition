<template>
  <pull-to :top-config="TOP_CONFIG" :top-load-method="refresh">
    <div>
      <nuxt-link class="user" to="/me">
        <img
          class="user__icon"
          :src="
            face_image_url ||
            'https://res.cloudinary.com/kiyopikko/image/upload/v1561617116/empty-user-image_o4ll8m.png'
          "
        />
        <div class="user__txt">マイページ</div>
      </nuxt-link>
      <Loader v-if="$fetchState.pending" />
      <template v-else>
        <div v-if="flattenFriends.length > 0" class="friends">
          <h2 class="headline">友だち</h2>
          <ul>
            <FriendItem
              v-for="(friend, i) in flattenFriends"
              :key="i"
              :to="`/friends/${friend.id}`"
              :nickname="friend.nickname"
              :date="friend.datetime"
              :img="friend.face_image_url || ''"
              :icon-placeholder="getPlaceholder(i)"
            />
          </ul>
        </div>
        <div v-else class="noFriends">
          <img
            src="https://res.cloudinary.com/kiyopikko/image/upload/v1562219254/hanly-gray_2x_pdy6qo.png"
            alt
            :width="178"
          />
          <p class="txt">
            右下のボタンからピンを打って近くの友だちを探しましょう
          </p>
        </div>
      </template>
      <button
        class="pin"
        :class="isPinning ? 'isPinning' : ''"
        :disabled="isPinning || !coords"
        @click="pin"
      />
    </div>
  </pull-to>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useContext,
  ref,
  useMeta,
} from '@nuxtjs/composition-api'
import { useGeolocation } from '@vueuse/core'
import PullTo from 'vue-pull-to'
import { useAppAxios } from '~/modules/axios'
import { convertFlattenFriend } from '~/modules/friend'
import { useAppFetch } from '~/modules/fetch'

const TOP_CONFIG = {
  pullText: '引っ張って更新',
  triggerText: '手放して更新',
  loadingText: '読み込み中...',
  doneText: '読み込み完了',
  failText: '読み込み失敗',
}

const getPlaceholder = (i: number) => {
  return i % 3 === 0
    ? 'linear-gradient(141.16deg, #F686AB 11.81%, #FFE177 82.38%)'
    : i % 3 === 1
    ? 'linear-gradient(141.16deg, #B7F4EF 11.81%, #E27EA0 85.05%)'
    : 'linear-gradient(141.16deg, #FFE073 11.81%, #AFFDF6 85.05%)'
}

export default defineComponent({
  head: {},
  components: {
    PullTo,
  },
  setup() {
    const { store } = useContext()
    const { coords } = useGeolocation()
    const friends = ref([])

    const { fetch: refetchFriends } = useAppFetch({
      data: friends,
      url: '/api/friends',
    })

    const { loading: isPinning, execute: pinAndMakeFriends } = useAppAxios({
      method: 'POST',
      url: '/api/my/pin',
    })

    const flattenFriends = computed(() =>
      friends && friends.value ? friends.value.map(convertFlattenFriend) : []
    )
    const face_image_url = computed(() => store.getters['me/face_image_url'])

    const pin = async () => {
      await pinAndMakeFriends({
        latitude: coords.value.latitude,
        longitude: coords.value.longitude,
      })
      refetchFriends()
    }
    const refresh = async (loaded: Function) => {
      await refetchFriends()
      loaded('done')
    }

    useMeta({ title: '友だち一覧 | Hanly' })

    return {
      flattenFriends,
      face_image_url,
      isPinning,
      TOP_CONFIG,
      getPlaceholder,
      coords,
      // function
      pin,
      refresh,
    }
  },
})
</script>

<style lang="scss" scoped>
.user {
  text-decoration: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  padding-right: 1.25rem;
  background-position: 100% calc(50% - 1px);
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg width='11' height='14' viewBox='0 0 11 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l9 6.333L1 13' stroke='%23fff' stroke-opacity='.2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  z-index: 1;
}

.user__icon {
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 50%;
}

.user__txt {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: rgba($color: #fff, $alpha: 0.7);
}

.headline {
  padding-left: 1rem;
  font-size: 0.875rem;
  margin-bottom: 0.375rem;
  margin-top: 5.375rem;
}

.noFriends {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.txt {
  font-size: 0.875rem;
  color: rgba($color: #fff, $alpha: 0.7);
  text-align: center;
  max-width: 17.5rem;
  margin-top: 2.5rem;
}

.pin {
  z-index: 1;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 3.375rem;
  height: 3.375rem;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.06);
  background-color: #ec354b;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='28' viewBox='0 0 20 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.72 10.876c0 7.21-9.72 17.084-9.72 17.084S.28 18.087.28 10.876C.28 5.4 4.632.96 10 .96s9.72 4.44 9.72 9.916zM10 14.977c2.3 0 4.166-1.903 4.166-4.25S12.3 6.477 10 6.477c-2.3 0-4.166 1.903-4.166 4.25S7.7 14.977 10 14.977z' fill='%23fff'/%3E%3C/svg%3E");
  &.isPinning {
    animation: pin 0.5s infinite linear;
  }
  &:disabled {
    opacity: 0.3;
  }
}

@keyframes pin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss">
.vue-pull-to-wrapper {
  position: absolute;
  width: 100%;
}

.action-block {
  color: rgba($color: #fff, $alpha: 0.3);
  border-bottom: 1px dashed rgba($color: #fff, $alpha: 0.08);
}
</style>
