<template>
  <v-app bar :style="image">
    <Sidebar />
    <v-main>
      <Navbar />
      <router-view></router-view>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  data () {
    return {
      image: { backgroundImage: 'url(https://i.imgur.com/vMAUndO.png)' }
    }
  },
  components: {
    Sidebar,
    Navbar,
    Footer
  }
}
</script>

<style>

</style>
