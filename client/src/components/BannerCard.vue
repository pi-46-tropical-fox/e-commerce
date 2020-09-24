<template>
        <!-- <div class="col-lg-6" style="background-image: url(https://image.shutterstock.com/z/stock-vector-tropical-palm-leaves-jungle-leaf-seamless-vector-floral-pattern-background-495523621.jpg)">
            <img class="card-img-top shadow my-5" :src="product.image_url" alt="product image" 
              style="width: auto; height:80vh;"/>
            </div> -->
        <div class="container mt-0" id="bannerHead" >
          <h1 class="font-weight-bold">Super Sale!</h1>
          <div class="card p-5 mb-5 shadow" style="height:50vh">
               <carousel :perPage=2 :autoplay="true">
                    <slide v-for="banner in banners" :key="banner.id">
                        <img :src="banner.image_url" alt="banner" style="width: auto; height:40vh;">
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
