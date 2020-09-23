<template>
  <div id="carouselExampleInterval" class="carousel slide pt-5" data-ride="carousel">
    <div class="carousel-inner">
      <!-- <div class="carousel-item active" data-interval="10000">
        <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg" class="d-block w-100" alt="banner">
      </div> -->
      <div class="carousel-item" data-interval="8000" v-for="(banner, index) in banners" :key="banner.id" :class="index === 0 ? 'active' : ''">
        <img :src="banner.image_url" class="d-block w-100" alt="banner">
      </div>
      <!-- <div class="carousel-item">
        <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg" class="d-block w-100" alt="banner">
      </div> -->
    </div>
    <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  created () {
    this.$store.dispatch('getBanners')
  },
  computed: {
    banners () {
      return this.$store.getters.activeBanners
    }
  }
}
</script>

<style scoped>
.carousel-inner {
  height: 25rem;
}
</style>
