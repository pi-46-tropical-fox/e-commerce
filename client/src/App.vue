<template>
  <div id="app">
    <Home></Home>
  </div>
</template>
<script>
import Home from './views/Home'
export default {
  components: {
    Home
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.state.isLogin = true
      this.$store.dispatch('fetchProfile')
      this.$store.dispatch('fetchCart')
      this.$store.dispatch('fetchProduct')
    } else {
      this.$store.state.isLogin = false
    }
  }
}
</script>
<style>

</style>
