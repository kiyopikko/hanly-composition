import localStorage from 'store2'
import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { axios } from '~/plugins/axios'

export default defineNuxtMiddleware(async ({ store, redirect }) => {
  const token = localStorage('hanly_access_token')
  if (!token) {
    // ユーザーが認証されていないとき
    return redirect('/signin')
  }
  const { data } = await axios('/api/me', {
    headers: {
      authorization: 'Bearer ' + localStorage('hanly_access_token'),
    },
  })
  store.commit('me/setMe', data)
})
