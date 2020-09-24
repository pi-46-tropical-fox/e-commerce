<template>
  <v-navigation-drawer v-model="showSidebar" app>
    <v-layout align-center justify-center row class="my-5">
      <img src="https://i.imgur.com/CazzVRS.png" height="40">
    </v-layout>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
        <v-list-item-action>
          <v-icon class="accent--text">{{link.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="primary--text">{{link.text}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Sidebar',
  data () {
    return {
      links: [
        { icon: 'home', text: 'Home', route: '/' },
        { icon: 'shopping_cart', text: 'Cart', route: '/cart' }
      ]
    }
  },
  computed: {
    ...mapState(['showSidebar']),
    showSidebar: {
      get () {
        return this.$store.state.showSidebar
      },
      set (value) {
        console.log(value)
      }
    }
  }
}
</script>

<style>
.v-list .v-list__item__title {
  text-decoration: none;
}

</style>
