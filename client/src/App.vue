<template>
  <div id="app">
    <div class="bar bg-dark">
      <div>
        <router-link to="/"><h3 class="logo">STORE 88</h3></router-link>
      </div>

      <div>
        <router-link class="mr-3 nav1" to="/Wishlist">Wishlist</router-link>
        <router-link class="mr-3 nav1" to="/Cart">Cart</router-link>
        <router-link class="mr-3 nav1" to="/History">History</router-link>
        <router-link class="btn btn-info mr-3" to="/Login" v-show="!isLogin">Login</router-link>
        <router-link class="btn btn-warning mr-3" to="/Register" v-show="!isLogin">Register</router-link>
        <b-button variant="secondary" class="mr-3" @click.prevent="logout" v-show="isLogin">Logout</b-button>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_IS_LOGIN', false)
      this.$router.push('/')
    }
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('SET_IS_LOGIN', true)
    } else {
      this.$store.commit('SET_IS_LOGIN', false)
    }
  }
}
</script>

<style>
#app {
  top: 70px;
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  margin-left: 30px;
  color: white;
}

.nav1 {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

body {
  margin: 0;
  padding: 0;
}

</style>
