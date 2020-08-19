import localStorage from 'store2'
// eslint-disable-next-line import/named
import { useFetch, Ref } from '@nuxtjs/composition-api'
import { axios } from '~/plugins/axios'

export const useAppFetch = ({ url, data }: { url: string; data: Ref }) => {
  const { fetch, fetchState } = useFetch(async () => {
    const result = await axios.get(url, {
      headers: {
        authorization: 'Bearer ' + localStorage('hanly_access_token'),
      },
    })
    data.value = result.data
  })
  return { fetch, fetchState }
}
