<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="product-list">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ProductCard from '@/components/shared/Card.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    ProductCard
  },

  computed: {
    products() {
      return this.$store.state.products
    }
  },

  created(){
    this.$store.dispatch('getCart')
  }
}
</script>
