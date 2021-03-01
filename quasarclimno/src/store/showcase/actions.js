/*
export function someAction (context) {
}
*/
import { mapActions } from 'vuex'
import { api } from 'boot/axios'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // map `this.increment()` to `this.$store.dispatch('increment')`

      // `mapActions` also supports payloads:
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // map `this.add()` to `this.$store.dispatch('increment')`
    })
  }
}
/*
export function register ({ commit }, form) {
  return api.post('/register', form)
    .then(response => {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
      commit('login', { token: response.data.token, user: response.data.user })
    })
}
*/

export function login ({ commit }, form) {
  return api.post('/login', form)
    .then(response => {
      api.defaults.headers.common.Authorization = 'Bearer ' + response.data.token
      commit('login', { token: response.data.token, user: response.data.user })
    })
}
