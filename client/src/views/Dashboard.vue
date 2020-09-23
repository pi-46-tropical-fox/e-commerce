<template>
  <section class="projects-section bg-light" id="projects">

        <Loading v-if="$store.state.loadingStatus"/>

        <BannerCard> </BannerCard>

        <div class="container">
          <div  v-for="(product,index) in products" :key="index">
          <ProductCardLeft v-if="index%2 == 0"
             :product="product" :number="index"> </ProductCardLeft>
          <ProductCardRight v-if="index%2 != 0"
             :product="product" :number="index"> </ProductCardRight>
          </div>
            </div>
        </section>
</template>

<script>
import ProductCardLeft from '../components/ProductCardLeft.vue'
import ProductCardRight from '../components/ProductCardRight.vue'
import Loading from '../components/Loading.vue'
import BannerCard from '../components/BannerCard.vue'
export default {
  name: 'Dashboard',
  components: {
    ProductCardLeft,
    ProductCardRight,
    Loading,
    BannerCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    }
    // filterCategories () {
    //   this.data.products = this.data.products.filter(item => item.category === this.category)
    // },
  },
  created () {
    this.fetchProducts()
  }

}
</script>

<style>

</style>
