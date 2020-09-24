<template>
  <div class="home">
    <Navbar />
    <div class="container" style="margin-top: 30px">
      <div class="row d-flex">
        <Product
          v-for="product in products"
          :key="product.id"
          :productData="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar'
import Product from '@/components/ProductCards'

export default {
  name: 'Home',
  components: {
    Navbar,
    Product
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProducts')
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>
