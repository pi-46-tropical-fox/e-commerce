<template>
  <div class="home">
    <Sidebar class="col-2 side"></Sidebar>
    <div class="col-9 productList">
      <!-- <ProductItem v-for="product in products" :key="product.id" :product="product"></ProductItem> -->
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Sidebar
  },
  computed: {
    products: {
      get () {
        return this.$store.state.products
      }
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
.side {
  margin-top: 70px;
  border: solid grey;
  height: 700px;
}
.productList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 70px;
}
</style>
