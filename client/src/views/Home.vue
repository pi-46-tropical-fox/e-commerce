<template>
  <div class="home">
    <Navbar></Navbar>
      <div class="card-container">
        <CardProduct
        v-for="product in products" :key="product.id"
        :itemData="product">
        </CardProduct>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
import CardProduct from '../components/CardProduct'

export default {
  name: 'Home',
  components: {
    Navbar,
    CardProduct
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>
