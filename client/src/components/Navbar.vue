<template>
  <nav class="navbar navbar-expand-sm bg-light navbar-light">
    <router-link to="/" class="navbar-brand">Home</router-link>
    <router-link v-if="loginStatus" to="/cart" class="nav-link">
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
      </svg>
    </router-link>
    <router-link v-if="!loginStatus" to="/register" class="nav-link">Register</router-link>
    <router-link v-if="!loginStatus" to="/login" class="nav-link">Login</router-link>
    <a v-if="loginStatus" @click.prevent="logout" class="nav-link" href="">Logout</a>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('CHANGE_LOGIN_STATUS', false)
      this.$router.push('/login')
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.loginStatus
    }
  }
}
</script>
