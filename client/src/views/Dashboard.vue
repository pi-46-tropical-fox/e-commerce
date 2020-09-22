<template>
  <div class="container">
      <Loading v-if="$store.state.loadingStatus"/>
    <div class="row row-cols-1 row-cols-md-3">

      <ProductCard v-for="(product,index) in products" :key="index"
        :product="product" :number="index"> </ProductCard>
      </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import Loading from '../components/Loading.vue'
export default {
  name: 'Dashboard',
  components: {
    ProductCard,
    Loading
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
