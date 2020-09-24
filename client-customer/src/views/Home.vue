<template>
  <div>
    <Navbar></Navbar>
    <div class="home-grid">
      <div class="product-list">
          <Card
          v-for="product in products"
          :key="product.id"
          :product="product"
          ></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from '../components/Cart'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    Navbar,
    Card
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

<style>
.home-grid {
  display: grid;
  grid-template-areas: 
    'navbar'
    'product-list';
  grid-template-rows: 100px min-content;
  grid-template-columns: 1fr 5fr;
  height: 100vh;
  width: 100vw;
  gap: 5px;

}
.navbar {
  grid-area: navbar;
}
.product-list {
  padding: 15px;
  grid-area: product-list;
  background-color: inherit;
  display: grid;
  grid-template-columns: repeat(4, 22%);
  grid-row: 100px;
  grid-auto-rows: auto;
  gap: 15px;

}

</style>
