<template>
  <div>
    <h1 class="justify-content-center"><b>Cart</b></h1>
    <div class="container mt-3">
      <div id="cart-nav" class="justify-content-center">
        <router-link :to="`/cart/unpaid`">Active</router-link> | 
        <router-link :to="`/cart/paid`">Paid</router-link>
      </div>
      <h3 class="text-center mt-2" v-show="checkRoute === 'Unpaid Products'">Total: {{total}}<img src="../assets/Gold_symbol.png" class="ml-1" width="30px"></h3>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    checkRoute () {
      return this.$route.name
    },
    total () {
      return this.$store.state.total
    }
  },
  created () {
    this.$store.dispatch('getCart')
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

#cart-nav a {
  font-weight: bold;
  color: #2c3e50;
}

#cart-nav a.router-link-exact-active {
  color: #42b983;
}
</style>