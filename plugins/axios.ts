import axios from 'axios'

axios.defaults.baseURL = process.env.baseURL

export { axios }
