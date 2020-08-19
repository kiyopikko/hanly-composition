<template>
  <div class="person">
    <PersonImage :src="faceImageUrl" :editable="editable" />
    <h2 class="nickname">{{ nickname }}</h2>
    <div v-if="latitude && latitude" class="mapWrap">
      <PersonMap :latitude="latitude" :longitude="longitude" />
    </div>
    <p class="datetime">
      {{
        latitude && longitude ? `${datetime} 時点` : 'まだピンを打っていません'
      }}
    </p>
    <div class="buttonWrap">
      <BaseButton to="/friends">戻る</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    nickname: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    faceImageUrl: {
      type: String,
      default: '',
    },
    editable: {
      type: Boolean,
    },
  },
})
</script>

<style lang="scss" scoped>
.person {
  margin-top: 2rem;
}

.nickname {
  text-align: center;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
}

.mapWrap {
  height: 20rem;
}

.datetime {
  font-size: 0.875rem;
  color: rgba($color: #fff, $alpha: 0.7);
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.buttonWrap {
  padding: 1rem;
}
</style>
