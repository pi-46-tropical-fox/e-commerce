<template>
  <v-toolbar dark>
    <v-app-bar-nav-icon @click.stop="toggleSidebar"></v-app-bar-nav-icon>
    <v-toolbar-title><span class="logo">mariope<span class="logo-lastchild">toko</span></span></v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link id="btn-user" style="margin-right: 5px;" to="/login">Register</router-link> |
    <router-link id="btn-user" style="margin: 0 5px;" to="/login">Login</router-link> |
    <button @click.prevent="logout" id="btn-user" style="margin-left: 5px;">Logout</button>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Navbar',
  methods: {
    ...mapActions(['toggleSidebar']),
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style>
.logo {
  font-family: 'Baumans', cursive;
  font-size: 1.6rem;
}
.logo-lastchild {
  font-family: 'Baumans', cursive;
  font-size: 1.6rem;
  color: #E31E52;
}
#btn-user {
  color: #fff;
  text-decoration: none;
}
</style>
