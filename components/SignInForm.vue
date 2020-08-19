<template>
  <form class="form" @submit.prevent="$emit('submit', { email, password })">
    <BaseInput v-model="email" placeholder="メールアドレス" type="email" />
    <BaseInput v-model="password" placeholder="パスワード" type="password" />
    <BaseButton class="mts" :disabled="isSending">ログイン</BaseButton>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    isSending: Boolean,
  },
  setup() {
    const state = reactive({
      email: '',
      password: '',
    })
    return { ...toRefs(state) }
  },
})
</script>
