<template>
  <div id="app">
    <div id="nav" class="row justify-content-center">
      <router-link to="/" class="col-3" v-show="!this.$store.state.isLogged">Home</router-link>
      <router-link to="/register" class="col-3" v-show="!this.$store.state.isLogged">Register</router-link>
      <router-link to="/login" class="col-3" v-show="!this.$store.state.isLogged">Login</router-link>
      <router-link to="/cart/unpaid" class="col-3" v-show="this.$store.state.isLogged">Cart</router-link>
      <router-link to="/products/1" class="col-3">Products</router-link>
      <a class="col-3" href="" @click.prevent="logout" v-show="this.$store.state.isLogged">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      options: [

      ],
      showAdd: false,
      addData: {
        name: '',
        image_url: '',
        price: 0,
        stock: 0,
        category: ''
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  created () {
    this.$store.commit('changeLogged')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
