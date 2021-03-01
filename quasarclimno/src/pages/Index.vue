<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F);"
  >
    <div class="column q-pa-lg" @submit.prevent="onSubmit">
      <div>
        <div class="text-h2" style="opacity:.4">
          Clase 2DAM DI-AD
        </div>
      </div>
    </div>
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:495px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Login</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="add" color="purple-4" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input square clearable v-model="username" type="Nom" label="Nom*">
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password*">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" label="Sign In" @click="prueba"/>
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6"><a :href="link">Register</a></p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      link: 'http://localhost:8080/#/register',
      token: ''
    }
  },
  methods: {
    onSubmit () {
      const usuario = {
        username: this.username,
        password: this.password
      }
      this.$emit('login', usuario)
      this.username = ''
      this.password = ''
    },
    prueba () {
      // return api.post('/register', this.username,this.password).then(response => {
      //   api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
      //   commit('login', {token: response.data.token, user: response.data.user})
      // })
      api.get('/notes').then((response) => {
        this.data = response.data
        this.username = this.data
      }).catch((err) => {
        this.username = err
      })
    },
    login () {
      const usuario = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('login', usuario).then(response => {
        console.log('H')
      }, (er) => {
        console.log('H')
      })
      console.log('asdasdasd')
    }
  }
}
</script>

<style>
</style>
