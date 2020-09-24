<template>
  <div id="app">
    <!-- Navbar -->
    <Navbar
    v-if="getStatus === 'loggedin'"
    ></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  data(){
    return {
      currentPage: ''
    }
  },
  computed: {
    getStatus(){
      return this.$store.state.currentStatus
    }
  },
  components: {
    Navbar
  },
  created(){
    if(localStorage.access_token){
      this.$store.commit("SET_STATUS", 'loggedin')
    }
  }
}
</script>

<style>

</style>
