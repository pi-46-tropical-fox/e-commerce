<template>
  <div class="home">
    <Carousel />
    <div class="d-flex ma-10 flex-wrap align-center justify-space-between">
      <ProductCard style="margin: 1em 6px;" :key="product.id" v-for="product in products" :dataProduct="product"></ProductCard>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import ProductCard from '@/components/ProductCard'
export default {
  name: 'Home',
  components: {
    Carousel,
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      console.log('method fetchproduct di home')
      this.$store.dispatch('fetchProducts')
    }
  },
  created () {
    console.log('masuk created di home')
    this.fetchProducts()
  }
}
</script>
