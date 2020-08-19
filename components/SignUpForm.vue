<template>
  <form
    class="form"
    @submit.prevent="$emit('submit', { nickname, email, password })"
  >
    <BaseInput v-model="nickname" placeholder="ニックネーム" />
    <BaseInput v-model="email" placeholder="メールアドレス" type="email" />
    <BaseInput v-model="password" placeholder="パスワード" type="password" />
    <BaseButton class="mts" :disabled="isSending">新規登録</BaseButton>
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
      nickname: '',
      email: '',
      password: '',
    })
    return { ...toRefs(state) }
  },
})
</script>
