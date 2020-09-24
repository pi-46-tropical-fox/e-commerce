<template>
  <div class="home mb-4">

    <b-carousel id="carousel-1" :interval="5000" controls indicators background="#ababab" img-width="1024" img-height="480"
      style="text-shadow: 3px 3px 9px #333;">
      <b-carousel-slide
        img-src="https://images.squarespace-cdn.com/content/v1/5a8704b249fc2bf6b2f1e587/1578943106045-P05J3WJUZMKW7DKRMXEZ/ke17ZwdGBToddI8pDm48kPTrHXgsMrSIMwe6YW3w1AZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0p52bY8kZn6Mpkp9xtPUVLhvLurswpbKwwoDWqBh58NLxQZMhB36LmtxTXHHtLwR3w/webslider.4.png"
        style="height: 608px">
        <br><small class="smolban">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.</small>
      </b-carousel-slide>
      <b-carousel-slide
        img-src="https://cdn.shopify.com/s/files/1/1656/2489/files/Homepage_Slider_1a_-_Martin_Garrix_2560x1440_2500x.jpg"
        style="height: 608px">
        <br><small class="smolban">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.</small>
      </b-carousel-slide>
      <b-carousel-slide
        img-src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/133023512/original/59832fdd182dbbfd5b3e6ab96901d5c847a7e401/design-stylish-web-banner-header-slider-and-fb.jpg"
        style="height: 608px">
        <br><small class="smolban">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.</small>
      </b-carousel-slide>
      <b-carousel-slide

        img-src="https://sliquid.com/wp-content/uploads/2017/10/Sliquid-Shop-Slider-free-T-shirt.png"
        style="height: 608px">
        <br><small class="smolban">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit lorem a consectetur luctus.</small>
      </b-carousel-slide>
    </b-carousel>

    <br><h1>All Products</h1>

    <div class="d-flex mx-auto row">
      <ProductsCard v-for="(product, idx) in this.$store.state.allProducts" :key="idx" :product="product"></ProductsCard>
    </div>
  </div>
</template>

<script>

import ProductsCard from '@/components/ProductsCard.vue'
export default {
  name: 'Home',
  components: {
    ProductsCard
  },
  data () {
    return {
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.state.isUser = true
      this.$store.dispatch('getMyCart')
      this.$store.state.userName = localStorage.username
    }
    this.getAllProducts()
  },
  computed: {
  },
  methods: {
    getAllProducts () {
      this.$store.dispatch('getProduct')
      // console.log('getAllProduct in Product.vue', this.$store.state.allProducts)
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style>
.text-large {
  font-size: 600%;
}
.smolban {
  color: white;
  text-shadow: 0px 3px 4px #000000;
  font-weight: bold;
}
h2 {
  font-weight: bold;
  color: rgb(81, 143, 85);
  font-size: 100px;
}
.interlock {
  color: lightyellow;
  font-family: 'Times New Roman', Times, serif;
}
.front {
  color: lightyellow;
  font-style: italic;
  font-size: 125px;
}
.btreck {
  color: rgb(255, 255, 255);
  font-family: Cambria;
  font-style: italic;
}
</style>
