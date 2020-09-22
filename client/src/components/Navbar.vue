<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
      <a class="navbar-brand text-light" href="#">AmaJohn</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav" v-if="!isLogin">
          <router-link class="nav-link active text-light" :to="{ name: 'Login' }">Login</router-link>
          <router-link class="nav-link active text-light" :to="{ name: 'Register' }">Register</router-link>
        </div>
        <div class="navbar-nav" v-else>
          <router-link class="nav-link active text-light" :to="{ name: 'Products' }">Products</router-link>
          <router-link class="nav-link active text-light" :to="{ name: 'Carts' }">Cart</router-link>
          <router-link class="nav-link active text-light" :to="{ name: 'Wishlists' }">Wishlists</router-link>
          <a class="nav-link active text-light" href="#" @click.prevent="logout">Logout</a>
        </div>
        <div class="d-flex align-items-center" v-if="getEmail">
          <div class="text-white ml-5">{{ getEmail }}</div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin () {
      if (localStorage.access_token) {
        return true
      }
      return false
    },
    getEmail () {
      if (!localStorage.user_email) {
        return false
      }
      return localStorage.user_email
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>

</style>
