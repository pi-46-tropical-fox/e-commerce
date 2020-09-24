<template>
  <div class="home mb-4">
    <br>
    <div class="d-flex mx-auto row">
      <WomenCard v-for="(product, idx) in this.$store.state.perCategory" :key="idx" :product="product"></WomenCard>
    </div>

  </div>
</template>

<script>

import WomenCard from '@/components/WomenCard.vue'

export default {
  name: 'Women',
  components: {
    WomenCard
  },
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getCategory', 'Women')
    if (localStorage.access_token) {
      this.$store.state.isUser = true
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style>
h2 {
  font-weight: bold;
  color: rgb(81, 143, 85);
  font-size: 100px;
}
.categorytitle {
  font-size: 500%;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
video {
    width: 100%;
}
</style>
