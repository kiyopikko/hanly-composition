// eslint-disable-next-line import/named
import { reactive, toRefs } from '@nuxtjs/composition-api'
import { axios } from '~/plugins/axios'

export const useAppAxiosExecute = ({
  method = 'GET',
  url,
  contentType = 'application/json',
  errorMessage = '予期せぬエラーが発生しました',
}: {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  contentType?: string
  errorMessage?: string
}) => {
  const state = reactive({
    data: undefined,
    error: '',
    loading: false,
  })

  async function execute(payload: Object) {
    state.loading = true

    try {
      const headers = {
        Authorization:
          'Bearer ' +
          (process.browser
            ? window.localStorage.getItem('hanly_access_token')
            : ''),
      }
      let result
      if (contentType === 'multipart/form-data') {
        result = await axios.post(url, payload, {
          headers,
        })
      } else {
        result = await axios({
          method,
          url,
          data: payload,
          headers,
        })
      }
      state.data = result.data
      state.loading = false
      return result.data
    } catch (e) {
      state.error = errorMessage
      state.loading = false
      setTimeout(() => {
        state.error = ''
      }, 3000)
    }
  }

  return {
    ...toRefs(state),
    execute,
  }
}
