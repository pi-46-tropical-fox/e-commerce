<template>
  <div class="home">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#" @click="filterProducts('')">Categories</a>

  <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo03">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item">
        <a class="nav-link" @click="filterProducts('Dive Watch')" role="button">Dive Watch <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="filterProducts('Dress Watch')" role="button">Dress Watch</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="filterProducts('Sports Watch')" role="button">Sports Watch</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="filterProducts('Tool Watch')" role="button">Tool Watch</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="filterProducts('Casual Watch')" href="#">Casual Watch</a>
      </li>
    </ul>
  </div>
</nav>
<!-- Cards -->
    <div class="container">
      <div class="row">
        <Card
        v-for="product in filteredProducts"
        :key="product.id"
        :productsData="product"> </Card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card.vue'

export default {
  name: 'Home',
  data () {
    return {
      selectedCategory: ''
    }
  },
  components: {
    Card
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    filterProducts (category) {
      this.selectedCategory = category
      console.log(this.filteredProducts, 'ini filteredProducts')
    }
  },
  computed: {
    filteredProducts () {
      return this.$store.getters.filteredProducts(this.selectedCategory)
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>
