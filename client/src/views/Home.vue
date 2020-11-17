<template>
  <div class="home">
    <NavbarHome/>
    <router-view/>

  </div>
</template>

<script>

import NavbarHome from '../components/NavbarHome.vue'

export default {
  name: 'Home',
  components: {
    NavbarHome
  },
  computed: {

  },
  methods: {

  },
  created () {

  }
}
</script>
