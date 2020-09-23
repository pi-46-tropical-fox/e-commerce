<template>
    <div>
      <div class="container">
        <div class="row no-gutters">
            <ProductCard v-for="product in $store.state.products" :key="product.id" :product="product" ></ProductCard>
        </div>
      </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
export default {
  name: 'Home',
  components: {
    ProductCard
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style scoped>
</style>