<template>
  <div class="loaderWrap" :class="{ withoutBack }">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    withoutBack: {
      type: Boolean,
    },
  },
})
</script>

<style lang="scss" scoped>
$loaderBase: 20px;

.loaderWrap {
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba($color: #000, $alpha: 0.6);
  &.withoutBack {
    background: none;
  }
}

.loader {
  position: relative;
  left: $loaderBase * -5 / 2;
  top: -1 * 1/2 * $loaderBase;
}
.loader span {
  position: absolute;
  width: $loaderBase;
  height: $loaderBase;
  background: #1bd7c7;
  opacity: 1;
  border-radius: 50%;
  animation: loader 1s infinite ease-in-out;
}
.loader span:nth-child(2) {
  left: $loaderBase;
  animation-delay: 0.2s;
}
.loader span:nth-child(3) {
  left: $loaderBase * 2;
  animation-delay: 0.4s;
}
.loader span:nth-child(4) {
  left: $loaderBase * 3;
  animation-delay: 0.6s;
}
.loader span:nth-child(5) {
  left: $loaderBase * 4;
  animation-delay: 0.8s;
}
@keyframes loader {
  0% {
    opacity: 0.8;
    transform: translateY(0);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  }
  50% {
    opacity: 1;
    transform: translateY(-1 * 1/2 * $loaderBase);
    background: #f8d25a;
    box-shadow: 0 $loaderBase 3px rgba(0, 0, 0, 0.05);
  }
  100% {
    opacity: 0.8;
    transform: translateY(0);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  }
}
</style>
