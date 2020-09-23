<template>
  <div>
    <Navbar></Navbar>
    <Banner></Banner>
    <!-- <div class="btn-group mt-1" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-dark mr-2" @click.prevent="$router.push({ name: 'Carts' })">Electronics</button>
      <button type="button" class="btn btn-dark mr-2">Books</button>
      <button type="button" class="btn btn-dark mr-2">Shoes</button>
      <button type="button" class="btn btn-dark mr-2">Clothes</button>
    </div> -->
    <div class="container mb-5">
      <div class="row">
        <div class="col-4 mt-5" v-for="product in products" :key="product.id">
          <div class="card" style="width: 18rem;" v-if="product.stock">
            <img :src="product.image_url" class="card-img-top" alt="product">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">Rp.{{ Number(product.price).toLocaleString('de-DE') }}</p>
              <p class="card-text">Stock <span class="badge badge-warning">{{ product.stock }}</span></p>
              <a href="#" class="btn btn-sm btn-dark mr-2" @click.prevent="addToCart(product.id)">+ Cart</a>
              <a href="#" class="btn btn-sm btn-dark">+ Wishlist</a>
            </div>
          </div>
          <div class="card" style="width: 18rem;" v-else>
            <img src="https://i.pinimg.com/736x/c5/80/2e/c5802ea3c3692238d90edb7c8d8e845d.jpg" class="card-img-top" alt="product">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">Rp.{{ Number(product.price).toLocaleString('de-DE') }}</p>
              <p class="card-text">Stock <span class="lead"><span class="badge badge-danger">Out of Stock</span></span></p>
              <a href="#" class="btn btn-primary mr-2" @click.prevent="preOrder">Pre-Order</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Banner from '../components/Banner.vue'
export default {
  name: 'Products',
  components: {
    Navbar,
    Banner,
    Footer
  },
  created () {
    this.$store.dispatch('getProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    addToCart (productId) {
      this.$store.dispatch('addToCart', productId)
    },
    preOrder () {
      this.$store.dispatch('preOrder')
    }
  }
}
</script>

<style>

</style>
