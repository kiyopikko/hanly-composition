<template>
  <div class="wrap">
    <SignUpForm :is-sending="isSending" @submit="submit" />
    <BaseButton to="/" class="mts" is-txt>戻る</BaseButton>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from '@nuxtjs/composition-api'
import { useAppAxios } from '~/modules/axios'

export default defineComponent({
  layout: 'account',
  setup(_p, { root: { $router } }) {
    const { data, error, loading: isSending, execute: signUp } = useAppAxios({
      method: 'POST',
      url: '/api/signup',
      errorMessage: '登録済みのメールアドレスです',
    })

    watch([data], () => {
      if (data.value) {
        $router.push('/signin')
      }
    })

    return {
      isSending,
      error,
      submit: signUp,
    }
  },
})
</script>

<style lang="scss" scoped>
.wrap {
  padding: 2.5rem 1rem 0;
}
</style>
