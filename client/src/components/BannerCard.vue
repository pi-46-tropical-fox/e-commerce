<template>

        <div class="container">
          <div class="card m-5 p-5">
               <carousel :perPage=1 :autoplay="true">
                    <slide v-for="banner in banners" :key="banner.id">
                        <img :src="banner.image_url" alt="banner">
                    </slide>
                </carousel>
            </div>
          </div>

</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'BannerCard',
  components: {
    Carousel,
    Slide
  },
  computed: {
    banners () {
      return this.$store.state.banners
    }
  },
  methods: {
    fetchBanners () {
      this.$store.dispatch('fetchBanners')
    }
    // filterCategories () {
    //   this.data.products = this.data.products.filter(item => item.category === this.category)
    // },
  },
  created () {
    this.fetchBanners()
  }
}
</script>

<style>

</style>
