<template>
  <div class="wrap">
    <SignInForm
      :is-sending="signingIn || fetchingCredentials"
      @submit="signIn"
    />
    <BaseButton to="/" class="mts" is-txt>戻る</BaseButton>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, useMeta } from '@nuxtjs/composition-api'
import localStorage from 'store2'
import { useAppAxios } from '~/modules/axios'

export default defineComponent({
  layout: 'account',
  head: {},
  setup(_p, { root: { $router } }) {
    const {
      loading: fetchingCredentials,
      execute: fetchClientCredentials,
    } = useAppAxios({
      url: '/api/oauth/client-credentials',
    })

    const {
      data,
      error,
      loading: signingIn,
      execute: signWithToken,
    } = useAppAxios({
      url: '/api/oauth/token',
      method: 'POST',
      errorMessage: 'メールアドレスが存在しないか、パスワードが間違っています',
    })

    watch([data], () => {
      if (data.value) {
        localStorage('hanly_access_token', data.value.access_token)
        $router.push('/friends')
      }
    })

    const signIn = async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) => {
      const { client_id, client_secret } = await fetchClientCredentials()
      signWithToken({
        grant_type: 'password',
        client_id,
        client_secret,
        scope: '*',
        username: email,
        password,
      })
    }

    useMeta({ title: 'ログイン | Hanly' })

    return {
      signingIn,
      fetchingCredentials,
      error,
      signIn,
    }
  },
})
</script>

<style lang="scss" scoped>
.wrap {
  padding: 2.5rem 1rem 0;
}
</style>
