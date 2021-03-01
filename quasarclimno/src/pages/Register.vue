<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:585px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Registration</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="close" color="purple-4" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input square clearable v-model="dni" type="dni" label="DNI*"
              lazy-rules
              :rules="[
              val => val && val.length > 0 || 'Introducir DNI',
              val => isValid && val.length == 9 || 'No es un DNI válido']">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="nomcomplet" type="nomcomplet" label="Nom complet*"
              lazy-rules
              :rules="[val => val && val.length > 0 || 'Introducir nombre']">>
                <template v-slot:prepend>
                  <q-icon name="assignment_ind" />
                </template>
              </q-input>
              <q-input square clearable v-model="username" type="username" label="Username*"
              lazy-rules
              :rules="[val => val && val.length > 0 || 'Introducir username']">>
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password*"
              lazy-rules
              :rules="[val => val && val.length > 0 || 'Introducir contraseña']">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input square clearable v-model="password2" type="password" label="Password*"
              lazy-rules
              :rules="[val => val && val.length > 0 || 'No coinciden las contraseñas', val => val == password || 'No coinciden']">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" label="Register" @click="register" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Return to <a :href="link">login</a></p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      dni: '',
      nomcomplet: '',
      username: '',
      password: '',
      password2: '',
      link: 'http://localhost:8080/#/'
    }
  },
  methods: {
    isValid () {
      const exp = new RegExp('[0-9]{8}[A-Z]')
      return exp.test(this.dni)
    },
    register () {
      const usuario = {
        username: this.username,
        password: this.password,
        dni: this.dni,
        full_name: this.nomcomplet
      }
      this.$store.dispatch('showcase/register', usuario).then(response => {
        this.username = 'registrado'
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
