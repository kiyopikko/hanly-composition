<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useLeaflet } from '~/modules/map'

export default defineComponent({
  props: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  setup({ latitude, longitude }) {
    onMounted(() => {
      useLeaflet({ latitude, longitude, id: 'map' })
    })
  },
})
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
}
</style>
