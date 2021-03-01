<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerState = !drawerState"
        />

        <q-toolbar-title>
          Qualifiacions App
        </q-toolbar-title>

        <div>{{fecha}}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
const linksData = [
  {
    title: 'Login',
    caption: 'Login or register with us',
    icon: 'school',
    link: 'http://localhost:8080/#/'
  },
  {
    title: 'About',
    caption: 'Know about us',
    icon: 'favorite',
    link: 'http://localhost:8080/#/about'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: true,
      essentialLinks: linksData
    }
  },
  computed: {
    drawerState: {
      get () {
        return this.$store.state.showcase.drawerState
      },
      set (val) {
        this.$store.commit('showcase/updateDrawerState', val)
      }
    },
    fecha () {
      const today = new Date()
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return today.toLocaleDateString('ca-ES', options)
    }
  }
}
</script>
