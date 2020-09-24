<template>
  <div id="app">
    <Navbar />
    <div class="container mx-auto pt-8">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/shared/Navbar.vue'

export default {
  components: {
    Navbar
  },

  created(){
    console.log(this.$store.state.userData);
    this.$store.dispatch('getAuthState')
  }
}
</script>
<style>
body{
  @apply bg-gray-300
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app > .container > div {
  @apply pt-16
}
</style>
