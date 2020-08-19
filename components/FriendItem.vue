<template>
  <li class="item">
    <nuxt-link :to="to" class="link">
      <img v-if="!!img" :src="img" alt class="img" />
      <span
        v-else
        class="placeholder"
        :style="{
          background: iconPlaceholder,
        }"
      ></span>
      <div class="body">
        <div class="nickname">{{ nickname }}</div>
        <div class="date">{{ date }}</div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    iconPlaceholder: {
      type: String,
      default: 'rgba(255,255,255,0.2)',
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  list-style-type: none;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  & + & {
    border-top: none;
  }
}

.link {
  display: flex;
  padding: 0.5rem 0 0.5rem 0.5rem;
  text-decoration: none;
  color: #fff;
}

.img,
.placeholder {
  display: block;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.body {
  margin-left: 0.75rem;
  padding-top: 0.375rem;
  width: calc(100% - 0.75rem - 3rem);
}

.nickname {
  font-weight: 700;
  line-height: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.date {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1;
}
</style>
