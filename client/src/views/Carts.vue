<template>
  <div>
    <Navbar></Navbar>
    <div class="container pt-5 mb-5">
      <div class="row">
        <div class="col-4 mt-5" v-for="cart in carts" :key="cart.id">
          <div class="card" style="width: 18rem;">
            <img :src="cart.Product.image_url" class="card-img-top" alt="product">
            <div class="card-body">
              <h5 class="card-title">{{ cart.Product.name }}</h5>
              <p class="card-text">Ordered: {{ cart.quantity }}</p>
              <p class="card-text">Unit price: Rp.{{ Number(cart.Product.price).toLocaleString('de-DE') }}</p>
              <p class="card-text">Checkout: <span class="lead"><span class="badge badge-danger">Rp.{{ Number(cart.Product.price * cart.quantity).toLocaleString('de-DE') }}</span></span></p>
              <p class="card-text"><span class="badge badge-warning">{{ cart.Product.stock }}</span> left in stock</p>
              <div class="btn-group-vertical mr-2">
              <a href="#" class="btn btn-sm btn-warning" @click.prevent="addOne(cart.Product.id)">+ Qty</a>
              <a href="#" class="btn btn-sm btn-dark" @click.prevent="subtractOne(cart.id)">- Qty</a>
              </div>
              <a href="#" class="btn btn-sm btn-primary mr-2" @click.prevent="checkout(cart.id)">Checkout</a>
              <a href="#" class="btn btn-sm btn-dark" @click.prevent="deleteCart(cart.id)">Remove</a>
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
  name: 'Carts',
  components: {
    Navbar,
    Footer
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.$store.dispatch('getCarts')
  },
  methods: {
    deleteCart (cartId) {
      this.$store.dispatch('deleteCart', cartId)
    },
    checkout (cartId) {
      this.$store.dispatch('checkout', cartId)
    },
    addOne (productId) {
      this.$store.dispatch('addToCart', productId)
    },
    subtractOne (cartId) {
      this.$store.dispatch('subtractFromCart', cartId)
    }
  }
}
</script>

<style>

</style>
