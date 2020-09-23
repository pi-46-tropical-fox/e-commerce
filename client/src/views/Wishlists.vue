<template>
  <div>
    <Navbar></Navbar>
    <div class="container pt-5 mb-5">
      <div class="row">
        <div class="col-4 mt-5" v-for="wishlist in wishlists" :key="wishlist.id">
          <div class="card" style="width: 18rem;">
            <img :src="wishlist.Product.image_url" class="card-img-top" alt="product">
            <div class="card-body">
              <h5 class="card-title">{{ wishlist.Product.name }}</h5>
              <p class="card-text">Rp.{{ Number(wishlist.Product.price).toLocaleString('de-DE') }}</p>
              <p class="card-text"><span class="badge badge-warning">{{ wishlist.Product.stock }}</span> left in stock</p>
              <a href="#" class="btn btn-sm btn-dark mr-2" @click.prevent="addToCart(wishlist.Product.id)">+ Cart</a>
              <a href="#" class="btn btn-sm btn-dark" @click.prevent="removeFromWishlist(wishlist.id)">Remove</a>
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
export default {
  name: 'Wishlists',
  components: {
    Navbar,
    Footer
  },
  created () {
    this.$store.dispatch('getWishlists')
  },
  computed: {
    wishlists () {
      return this.$store.state.wishlists
    }
  },
  methods: {
    addToCart (productId) {
      this.$store.dispatch('addToCart', productId)
    },
    removeFromWishlist (wishlistId) {
      this.$store.dispatch('removeFromWishlist', wishlistId)
    }
  }
}
</script>

<style>

</style>
