import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({ baseURL: 'http://www.localhost:8082/' })
Vue.prototype.$api = api
// ^ ^ ^ this will allow you to use this.$api
// so you can easily perform requests against your app's API
export { axios, api }
