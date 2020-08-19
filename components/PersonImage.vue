<template>
  <div class="personImage">
    <img
      :id="editable ? 'pick-avatar' : ''"
      :src="
        src ||
        'https://res.cloudinary.com/kiyopikko/image/upload/v1561617116/empty-user-image_o4ll8m.png'
      "
      alt
      width="80"
      class="img"
    />
    <AvatarCropper
      v-if="editable"
      trigger="#pick-avatar"
      :labels="LABELS"
      :upload-url="uploadUrl"
      :upload-headers="{
        Authorization: `Bearer ${token}`,
      }"
      :output-options="{ width: 160, height: 160 }"
      @uploading="isUploadingRef = true"
      @uploaded="handleUploaded"
    />
    <Loader v-if="isUploadingRef" />
  </div>
</template>

<script>
import localStorage from 'store2'
import AvatarCropper from 'vue-avatar-cropper'
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

const LABELS = {
  submit: '完了',
  cancel: 'キャンセル',
}

export default defineComponent({
  components: {
    AvatarCropper,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
    editable: {
      type: Boolean,
    },
  },
  setup() {
    const { store } = useContext()
    const isUploadingRef = ref(false)

    const handleUploaded = (res) => {
      isUploadingRef.value = false
      store.commit('me/updateImage', res.face_image_url)
    }

    return {
      LABELS,
      isUploadingRef,
      uploadUrl: process.env.baseURL + process.env.uploadUrl,
      token: localStorage('hanly_access_token'),
      handleUploaded,
    }
  },
})
</script>

<style lang="scss" scoped>
.personImage {
  color: #222;
  text-align: center;
}

.img {
  border-radius: 50%;
}
</style>

<style lang="scss">
.avatar-cropper-close {
  text-decoration: none;
}
.avatar-cropper .avatar-cropper-mark {
  background: rgba(0, 0, 0, 0.7);
}
</style>
