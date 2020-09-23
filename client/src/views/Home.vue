<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="container">
      <h1 class="display-1 my-5">Products</h1>
      <Products></Products>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Products from '../components/Products.vue'
export default {
  components: {
    Navbar,
    Products
  },
}
</script>
